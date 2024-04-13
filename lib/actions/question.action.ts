"use server";

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
  GetTagIdByLabelDocument,
  GetTagIdByLabelQuery,
  LinkQuestionTagDocument,
  QuestionTags,
} from "../gql/types";
import { getGraphQLClient, getGraphQLRawClient } from "../graphql-client";
import { connectDatabase } from "../mongoose";
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

export async function createQuestionOld(params: CreateQuestionParams) {
  try {
    connectDatabase();
    const { title, tags, content, author, path } = params;
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [] as string[];

    await Promise.all(
      tags.map(async (tag) => {
        const existingTag = await Tag.findOne({
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        });

        if (existingTag) {
          existingTag.questions.push(question._id);
          await existingTag.save();
          tagDocuments.push(existingTag._id);
        } else {
          const response = await fetchOpenAICompletion(
            `a brief description of the ${tag} in less than 100 characters in plaintext.`
          );
          const reply = response.choices[0].message.content;

          const newTag = await Tag.create({
            name: tag,
            description: reply,
            questions: [question._id],
          });
          tagDocuments.push(newTag._id);
        }
      })
    );

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    await Interaction.create({
      user: author,
      action: "ask_question",
      question: question._id,
      tags: tagDocuments,
    });

    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

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

export async function voteQuestion({
  questionId,
  hasdownVoted,
  hasupVoted,
  userId,
  path,
}: QuestionVoteParams) {
  try {
    connectDatabase();
    const question = await Question.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    if (hasupVoted) {
      if (question.upvotes.includes(userId)) {
        await question.updateOne({ $pull: { upvotes: userId } });
        await User.findByIdAndUpdate(userId, {
          $inc: { reputation: -1 },
        });
        if (question.author.toString() !== userId) {
          await User.findByIdAndUpdate(question.author, {
            $inc: { reputation: -10 },
          });
        }
      } else {
        let times = 1;
        if (question.downvotes.includes(userId)) {
          await question.updateOne({ $pull: { downvotes: userId } });
          times = 2;
        }
        await question.updateOne({ $push: { upvotes: userId } });
        await User.findByIdAndUpdate(userId, {
          $inc: { reputation: times * 1 },
        });
        if (question.author.toString() !== userId) {
          await User.findByIdAndUpdate(question.author, {
            $inc: { reputation: times * 10 },
          });
        }
      }
    }
    if (hasdownVoted) {
      if (question.downvotes.includes(userId)) {
        await question.updateOne({ $pull: { downvotes: userId } });
        await User.findByIdAndUpdate(userId, {
          $inc: { reputation: 1 },
        });
        if (question.author.toString() !== userId) {
          await User.findByIdAndUpdate(question.author, {
            $inc: { reputation: 10 },
          });
        }
      } else {
        let times = 1;
        if (question.upvotes.includes(userId)) {
          await question.updateOne({ $pull: { upvotes: userId } });
          times = 2;
        }
        await question.updateOne({ $push: { downvotes: userId } });
        await User.findByIdAndUpdate(userId, {
          $inc: { reputation: -1 * times },
        });
        if (question.author.toString() !== userId) {
          await User.findByIdAndUpdate(question.author, {
            $inc: { reputation: -10 * times },
          });
        }
      }
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
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
    const { title, tags, content, author, path } = params;

    const tagDocuments = [] as string[];

    const tagMap = await handleTagsUpsert(tags);

    const client = await getGraphQLClient();
    const rawClient = await getGraphQLRawClient();
    const createQueRes = await client.createQuestion({
      title,
      content,
    });
    if (createQueRes.createQuestion?.id) {
      const { document, variables } = combinedQuery(
        "linkQuestionWithTags"
      ).addN(
        LinkQuestionTagDocument,
        Object.values(tagMap).map((tag) => ({
          questionId: createQueRes.createQuestion!.id,
          tagId: tag,
        }))
      );
      await rawClient.request<Record<string, QuestionTags>>(
        document,
        variables
      );
    }
    // console.log(JSON.stringify(response, null, 2));
    revalidatePath(path);
  } catch (error: any) {
    console.log(JSON.stringify(error.response));
    throw new Error("Error creating question");
  }
}

const handleTagsUpsert = async (tags: string[]) => {
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

export const getHotQuestions = async () => {
  try {
    const client = await getGraphQLClient();
    const questions = await client.HotQuestions({
      limit: 10,
    });
    console.log(JSON.stringify(questions, null, 2));
    return { hotQuestions: questions.listQuestions?.items || [] };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching hot questions");
  }
};
