"use server";

import { POINT_SYSTEM_OTHER, POINT_SYSTEM_SELF } from "@/constants";
import {
  default as combinedQuery,
  default as comineQuery,
} from "graphql-combine-query";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import Answer from "../database/answer.model";
import Interaction from "../database/interaction.model";
import Question from "../database/question.model";
import Tag from "../database/tag.model";
import User from "../database/user.model";
import {
  CreateQuestionActionDocument,
  GetTagIdByLabelDocument,
  GetTagIdByLabelQuery,
  InteractionType,
  LinkQuestionTagDocument,
  QuestionTags,
  UpdateTagQuestionCountDocument,
} from "../gql/types";
import { getGraphQLClient, getGraphQLRawClient } from "../graphql-client";
import { connectDatabase } from "../mongoose";
import { slugify } from "../utils";
import { fetchOpenAICompletion } from "./general.action";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionsByTagIdParams,
  GetQuestionsParams,
  GetQuestionsParamsDynamo,
  QuestionVoteParams,
  RecommendedParams,
} from "./shared.types";

export async function getQuestionsOld(params: GetQuestionsParams) {
  try {
    connectDatabase();
    const { searchQuery, filter, page = 1, pageSize = 1 } = params;

    const skip = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = {};
    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }
    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "frequent":
        sortOptions = { views: -1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        break;
      // case "recommended":
      //     query.answers = { $size: 0 };
      //     break;
      default:
        break;
    }
    const questions = await Question.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .skip(skip)
      .limit(pageSize)
      .sort(sortOptions);

    const totalQuestions = await Question.countDocuments(query);
    const isNext = totalQuestions > skip + questions.length;
    return { questions, isNext };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching questions");
  }
}

export async function getQuestionById(id: string) {
  try {
    connectDatabase();
    const question = await Question.findById(id)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id name clerkId picture",
      });
    return { question };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching question");
  }
}

export async function getQuestionBySlug(slug: string, userId: string) {
  try {
    const client = await getGraphQLClient();
    const questionIdReq = await client.getQuestionFromSlug({ slug });
    if (!questionIdReq.questionsBySlug?.items.length) return { question: null };
    const question = await client.getQuestionDetails({
      questionId: questionIdReq.questionsBySlug.items[0]!.id,
      ownerId: userId,
    });
    return {
      questionId: questionIdReq.questionsBySlug.items[0]!.id,
      question: question.getQuestion,
      actions: question.interactionsByQuestionIdAndOwnerId?.items || [],
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching question");
  }
}

export async function voteQuestion({
  questionId,
  upvoteAdded,
  upvoteRemoved,
  upvoteRemovedId,
  downvoteAdded,
  downvoteRemoved,
  downvoteRemovedId,
  userId,
  path,
}: QuestionVoteParams) {
  try {
    console.log(
      upvoteAdded,
      upvoteRemoved,
      upvoteRemovedId,
      downvoteRemoved,
      downvoteRemovedId
    );
    const client = await getGraphQLClient();
    await Promise.all([
      // update the question with the vote
      client.voteQuestion({
        questionId,
        upvote: upvoteAdded ? 1 : upvoteRemoved ? -1 : 0,
        downvote: downvoteAdded ? 1 : downvoteRemoved ? -1 : 0,
      }),
      // update the interaction with the upvote if it was added
      upvoteAdded &&
        client.createQuestionAction({
          actionType: InteractionType.UpvoteQuestion,
          questionId,
          ownerId: userId,
          pointsSelf: POINT_SYSTEM_SELF[InteractionType.UpvoteQuestion],
          pointsTarget: POINT_SYSTEM_OTHER[InteractionType.UpvoteQuestion],
        }),
      // update the interaction with the downvote if it was added
      downvoteAdded &&
        client.createQuestionAction({
          actionType: InteractionType.DownvoteQuestion,
          questionId,
          ownerId: userId,
          pointsSelf: POINT_SYSTEM_SELF[InteractionType.DownvoteQuestion],
          pointsTarget: POINT_SYSTEM_OTHER[InteractionType.DownvoteQuestion],
        }),
      // remove the interaction with the upvote if it was removed
      upvoteRemoved &&
        upvoteRemovedId &&
        client.deleteInteraction({
          actionId: upvoteRemovedId,
        }),
      // remove the interaction with the downvote if it was removed
      downvoteRemoved &&
        downvoteRemovedId &&
        client.deleteInteraction({
          actionId: downvoteRemovedId,
        }),
    ]);
    revalidatePath(path);
  } catch (error) {
    throw new Error("Error voting question");
  }
}

export async function getQuestionsByTagId({
  tagId,
  page = 1,
  pageSize = 20,
  searchQuery,
}: GetQuestionsByTagIdParams) {
  try {
    connectDatabase();

    const tagFilter: FilterQuery<typeof Tag> = { _id: tagId };
    const skip = (page - 1) * pageSize;
    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: new RegExp(searchQuery, "i") } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip,
        limit: pageSize + 1,
      },
      populate: [
        { path: "author", model: User, select: "_id clerkId name picture" },
        { path: "tags", model: Tag, select: "_id name" },
      ],
    });

    const isNext = tag.questions.length > pageSize;
    tag.questions = tag.questions.slice(0, pageSize);

    if (!tag) {
      throw new Error("Tag not found");
    }
    return { tag, isNext };
  } catch (error) {
    console.log(error);
    return { questions: [] };
  }
}

export const deleteQuestion = async (params: DeleteQuestionParams) => {
  try {
    connectDatabase();
    const { questionId, path } = params;
    await Question.deleteOne({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    );
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting question");
  }
};

export const editQuestion = async (params: EditQuestionParams) => {
  try {
    connectDatabase();
    const { questionId, path, content, title } = params;

    const question = await Question.findById(questionId).populate("tags");
    if (!question) {
      throw new Error("Question not found");
    }
    question.title = title;
    question.content = content;

    await question.save();
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting question");
  }
};

export const getHotQuestionsOld = async () => {
  try {
    const hotQuestions = await Question.find({})
      .sort({
        views: -1,
        upvotes: -1,
      })
      .limit(5);
    return { hotQuestions };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching hot questions");
  }
};

export async function getRecommendedQuestions(params: RecommendedParams) {
  try {
    await connectDatabase();

    const { userId, page = 1, pageSize = 20, searchQuery } = params;

    // find user
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("user not found");
    }

    const skipAmount = (page - 1) * pageSize;

    // Find the user's interactions
    const userInteractions = await Interaction.find({ user: user._id })
      .populate("tags")
      .exec();

    // Extract tags from user's interactions
    const userTags = userInteractions.reduce((tags, interaction) => {
      if (interaction.tags) {
        tags = tags.concat(interaction.tags);
      }
      return tags;
    }, []);

    // Get distinct tag IDs from user's interactions
    const distinctUserTagIds = [
      // @ts-ignore
      ...new Set(userTags.map((tag: any) => tag._id)),
    ];

    const query: FilterQuery<typeof Question> = {
      $and: [
        { tags: { $in: distinctUserTagIds } }, // Questions with user's tags
        { author: { $ne: user._id } }, // Exclude user's own questions
      ],
    };

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
      ];
    }

    const totalQuestions = await Question.countDocuments(query);

    const recommendedQuestions = await Question.find(query)
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .skip(skipAmount)
      .limit(pageSize);

    const isNext = totalQuestions > skipAmount + recommendedQuestions.length;

    return { questions: recommendedQuestions, isNext };
  } catch (error) {
    console.error("Error getting recommended questions:", error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    const { title, tags, content, userId, path } = params;

    const tagMap = await handleTagsUpsert(tags, userId);

    const client = await getGraphQLClient();
    const rawClient = await getGraphQLRawClient();
    const createQueRes = await client.createQuestion({
      title,
      content,
      ownerId: userId,
      slug: slugify(title, true),
    });
    if (createQueRes.createQuestion?.id) {
      const { document, variables } = combinedQuery("linkQuestionWithTags")
        .addN(
          LinkQuestionTagDocument,
          Object.values(tagMap).map((tag) => ({
            questionId: createQueRes.createQuestion!.id,
            tagIdToLink: tag,
          }))
        )
        // ? Update tag count
        .addN(
          UpdateTagQuestionCountDocument,
          Object.values(tagMap).map((tag) => ({
            count: 1,
            tagIdForCount: tag,
          }))
        )
        // ? Update interaction with created question
        .add(CreateQuestionActionDocument, {
          ownerId: userId,
          pointsSelf: POINT_SYSTEM_SELF[InteractionType.AskQuestion],
          questionId: createQueRes.createQuestion!.id,
          actionType: InteractionType.AskQuestion,
        });
      await rawClient.request<Record<string, QuestionTags>>(
        document,
        variables
      );
    }
    revalidatePath(path);
  } catch (error: any) {
    console.error(error);
    console.log(JSON.stringify(error.response));
    throw new Error("Error creating question");
  }
}

const handleTagsUpsert = async (rawTags: string[], ownerId: string) => {
  const tags = rawTags.map((tag) => slugify(tag));
  let tagMap: Record<string, string> = {};
  const rawClient = await getGraphQLRawClient();
  const client = await getGraphQLClient();
  const { document, variables } = comineQuery("tagsByLabel").addN(
    GetTagIdByLabelDocument,
    tags.map((tag) => ({ label: tag }))
  );
  const response = await rawClient.request<
    Record<string, GetTagIdByLabelQuery["tagsByLabel"]>
  >(document, variables);
  for (let [index, tagRes] of Object.values(response).entries()) {
    if (tagRes?.items.length) {
      tagMap[tags[index]] = tagRes.items[0]?.id || "";
    } else {
      const response = await fetchOpenAICompletion(
        `a brief description of the ${tags[index]} in less than 100 characters in plaintext.`
      );
      const reply = response.choices[0].message.content;
      const createTagRes = await client.createTag({
        label: tags[index],
        description: reply,
        ownerId,
      });
      tagMap[tags[index]] = createTagRes.createTag?.id || "";
    }
  }
  return tagMap;
};

export async function getQuestions(params: GetQuestionsParamsDynamo) {
  try {
    const { searchQuery, filter, token = undefined, pageSize = 25 } = params;
    const client = await getGraphQLClient();

    const questions = await client.HomeQuestions({
      filter: searchQuery ? { title: { contains: searchQuery } } : undefined,
      nextToken: token,
      limit: pageSize,
    });
    // console.log(JSON.stringify(questions, null, 2));
    return {
      questions: questions.listQuestions?.items || [],
      isNext: questions.listQuestions?.nextToken,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching questions");
  }
}

export const getHotQuestions = async (userId?: string) => {
  try {
    const client = await getGraphQLClient();
    const questions = await client.getTopQuestions({
      limit: 10,
      userId,
    });
    return { hotQuestions: questions.searchQuestions?.items || [] };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching hot questions");
  }
};
