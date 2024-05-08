"use server";

import { POINT_SYSTEM_OTHER, POINT_SYSTEM_SELF } from "@/constants";
import { revalidatePath } from "next/cache";
import Answer from "../database/answer.model";
import Interaction from "../database/interaction.model";
import Question from "../database/question.model";
import { InteractionType } from "../gql/types";
import { getGraphQLClient } from "../graphql-client";
import { connectDatabase } from "../mongoose";
import { sleep } from "../utils";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    const client = await getGraphQLClient();
    const { author, content, path, question } = params;
    const answer = await client.postNewAnswer({
      ownerId: author,
      content,
      questionId: question,
    });
    console.log(answer.createAnswer?.id);

    await client.updateAnswerCount({
      questionId: question,
      answerCount: 1,
    });

    await Promise.all([
      client.createAnswerAction({
        actionType: InteractionType.ReplyQuestion,
        answerId: answer.createAnswer?.id!,
        questionId: question,
        ownerId: "ownerId", //? sending static value for ownerId since its required, the actual value gets overridden in the vtl
        targetUserId: author,
        pointsSelf: POINT_SYSTEM_SELF[InteractionType.ReplyQuestion],
        pointsTarget: POINT_SYSTEM_OTHER[InteractionType.ReplyQuestion],
      }),
      client.updateAnswerCount({
        questionId: question,
        answerCount: 1,
      }),
    ]);
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

    const client = await getGraphQLClient();
    const answers = await client.getAnswersForQuestion({
      questionId,
      limit: pageSize,
      skip,
    });
    const isNext = (answers.searchAnswers?.total || 0) > page * pageSize;
    return {
      answers: answers.searchAnswers?.items || [],
      isNext,
      totalAnswers: answers.searchAnswers?.total || 0,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch answers");
  }
};

export const voteAnswer = async ({
  answerId,
  userId,
  upvoteRemovedId,
  downvoteRemovedId,
  downvoteAdded,
  downvoteRemoved,
  upvoteAdded,
  upvoteRemoved,
  path,
}: AnswerVoteParams) => {
  try {
    const client = await getGraphQLClient();
    await Promise.all([
      // update the question with the vote
      client.voteAnswer({
        answerId,
        upvote: upvoteAdded ? 1 : upvoteRemoved ? -1 : 0,
        downvote: downvoteAdded ? 1 : downvoteRemoved ? -1 : 0,
      }),
      // update the interaction with the upvote if it was added
      upvoteAdded &&
        client.createAnswerAction({
          actionType: InteractionType.UpvoteAnswer,
          answerId,
          ownerId: "userId", //? sending static value for ownerId since its required, the actual value gets overridden in the vtl
          targetUserId: userId,
          pointsSelf: POINT_SYSTEM_SELF[InteractionType.UpvoteAnswer],
          pointsTarget: POINT_SYSTEM_OTHER[InteractionType.UpvoteAnswer],
        }),
      // update the interaction with the downvote if it was added
      downvoteAdded &&
        client.createAnswerAction({
          actionType: InteractionType.DownvoteAnswer,
          answerId,
          ownerId: "userId", //? sending static value for ownerId since its required, the actual value gets overridden in the vtl
          targetUserId: userId,
          pointsSelf: POINT_SYSTEM_SELF[InteractionType.DownvoteAnswer],
          pointsTarget: POINT_SYSTEM_OTHER[InteractionType.DownvoteAnswer],
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
    await sleep(2);
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
