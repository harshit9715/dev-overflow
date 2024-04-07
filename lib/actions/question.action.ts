"use server";

import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import Answer from "../database/answer.model";
import Interaction from "../database/interaction.model";
import Question from "../database/question.model";
import Tag from "../database/tag.model";
import User from "../database/user.model";
import { connectDatabase } from "../mongoose";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionsByTagIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectDatabase();
    const { title, tags, content, author, path } = params;
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: {
            $regex: new RegExp(`^${tag}$`, "i"),
          },
        },
        {
          $setOnInsert: { name: tag },
          $push: { questions: question._id },
        },
        {
          upsert: true,
          new: true,
        }
      );
      tagDocuments.push(existingTag._id);
    }

    // update question with tags
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // create an interaction record  for user's ask_question action
    await Interaction.create({
      user: author,
      action: "ask_question",
      question: question._id,
      tags: tagDocuments,
    });
    // increment author's reputation by +5 points for creating a question
    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getQuestions(params: GetQuestionsParams) {
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

        await User.findByIdAndUpdate(question.author, {
          $inc: { reputation: -10 },
        });
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

        await User.findByIdAndUpdate(question.author, {
          $inc: { reputation: times * 10 },
        });
      }
    }
    if (hasdownVoted) {
      if (question.downvotes.includes(userId)) {
        await question.updateOne({ $pull: { downvotes: userId } });
        await User.findByIdAndUpdate(userId, {
          $inc: { reputation: 1 },
        });
        await User.findByIdAndUpdate(question.author, {
          $inc: { reputation: 10 },
        });
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
        await User.findByIdAndUpdate(question.author, {
          $inc: { reputation: -10 * times },
        });
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

export const getHotQuestions = async () => {
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
