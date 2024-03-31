"use server";

import { revalidatePath } from "next/cache";
import Answer from "../database/answer.model";
import Interaction from "../database/interaction.model";
import Question from "../database/question.model";
import { connectDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
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

    await Question.findByIdAndUpdate(question, {
      $push: { answers: answer._id },
    });

    // Todo: add interaction to the user

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create answer");
  }
};

export const getAnswers = async (questionId: string) => {
  try {
    connectDatabase();
    const answers = await Answer.find({ question: questionId })
      .populate("author")
      .sort({ createdAt: -1 });
    return { answers };
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
      } else {
        await answer.updateOne({
          $push: { upvotes: userId },
          $pull: { downvotes: userId },
        });
      }
    } else if (hasdownVoted) {
      if (answer.downvotes.includes(userId)) {
        await answer.updateOne({ $pull: { downvotes: userId } });
      } else {
        await answer.updateOne({
          $push: { downvotes: userId },
          $pull: { upvotes: userId },
        });
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
      { $pull: { answers: answerId } }
    );
    await Interaction.deleteMany({ answer: answerId });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting question");
  }
};
