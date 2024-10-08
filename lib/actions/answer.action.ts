"use server";

import { revalidatePath } from "next/cache";
import Answer from "../database/answer.model";
import Interaction from "../database/interaction.model";
import Question from "../database/question.model";
import User from "../database/user.model";
import { connectDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    connectDatabase();
    const { author, content, path, question } = params;
    const answer = await Answer.create({
      author,
      question,
      content,
    });

    const questionObject = await Question.findByIdAndUpdate(question, {
      $push: { answers: answer._id },
    });

    // Todo: add interaction to the user
    await Interaction.create({
      user: author,
      action: "answer",
      question,
      answer: answer._id,
      tags: questionObject.tags,
    });

    await User.findByIdAndUpdate(author, {
      $inc: { reputation: 10 },
    });

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create answer");
  }
};

export const getAnswers = async ({
  questionId,
  sortBy,
  page = 1,
  pageSize = 10,
}: GetAnswersParams) => {
  try {
    connectDatabase();

    let sortOptions = {};
    switch (sortBy) {
      case "highestUpvotes":
        sortOptions = { upvotes: -1 };
        break;
      case "lowestUpvotes":
        sortOptions = { upvotes: 1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
      default:
        break;
    }

    const skip = (page - 1) * pageSize;

    const answers = await Answer.find({ question: questionId })
      .populate("author")
      .skip(skip)
      .limit(pageSize)
      .sort(sortOptions);

    const totalAnswers = await Answer.countDocuments({ question: questionId });
    const isNext = totalAnswers > skip + answers.length;
    return { answers, isNext };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch answers");
  }
};

export const voteAnswer = async ({
  answerId,
  hasdownVoted,
  hasupVoted,
  userId,
  path,
}: AnswerVoteParams) => {
  try {
    connectDatabase();
    const answer = await Answer.findById(answerId);
    if (!answer) throw new Error("Answer not found");
    if (hasupVoted) {
      if (answer.upvotes.includes(userId)) {
        await answer.updateOne({ $pull: { upvotes: userId } });
        await User.findByIdAndUpdate(userId, {
          $inc: { reputation: -2 },
        });
        if (answer.author.toString() !== userId) {
          await User.findByIdAndUpdate(answer.author, {
            $inc: { reputation: -5 },
          });
        }
      } else {
        let times = 1;
        if (answer.downvotes.includes(userId)) {
          times = 2;
          await answer.updateOne({
            $pull: { downvotes: userId },
          });
        }
        await answer.updateOne({
          $push: { upvotes: userId },
        });
        await User.findByIdAndUpdate(userId, {
          $inc: { reputation: 2 * times },
        });
        if (answer.author.toString() !== userId) {
          await User.findByIdAndUpdate(answer.author, {
            $inc: { reputation: 5 * times },
          });
        }
      }
    } else if (hasdownVoted) {
      if (answer.downvotes.includes(userId)) {
        await answer.updateOne({ $pull: { downvotes: userId } });
        await User.findByIdAndUpdate(userId, {
          $inc: { reputation: 2 },
        });
        if (answer.author.toString() !== userId) {
          await User.findByIdAndUpdate(answer.author, {
            $inc: { reputation: 5 },
          });
        }
      } else {
        let times = 1;
        if (answer.upvotes.includes(userId)) {
          times = 2;
          await answer.updateOne({
            $pull: { upvotes: userId },
          });
        }
        await answer.updateOne({
          $push: { downvotes: userId },
        });
        await User.findByIdAndUpdate(userId, {
          $inc: { reputation: -2 * times },
        });
        if (answer.author.toString() !== userId) {
          await User.findByIdAndUpdate(answer.author, {
            $inc: { reputation: -5 * times },
          });
        }
      }
    }
    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to vote answer");
  }
};

export const deleteAnswer = async (params: DeleteAnswerParams) => {
  try {
    connectDatabase();
    const { answerId, path } = params;
    const answer = await Answer.findByIdAndDelete({ _id: answerId });
    if (!answer) throw new Error("Answer not found");
    await Question.updateMany(
      { answers: answerId },
      { $pull: { answers: answerId } },
    );
    await Interaction.deleteMany({ answer: answerId });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting question");
  }
};
