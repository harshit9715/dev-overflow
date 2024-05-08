"use server";

import { POINT_SYSTEM_OTHER, POINT_SYSTEM_SELF } from "@/constants";
import { InteractionType } from "../gql/types";
import { getGraphQLClient } from "../graphql-client";
import { ViewItemParams } from "./shared.types";

export async function viewItem(params: ViewItemParams) {
  try {
    const client = await getGraphQLClient();
    const { type, itemId, userId } = params;
    if (userId) {
      const query: Record<string, string> = {
        user: userId,
        action: "view",
      };
      if (type === "question") {
        query.question = itemId;
      } else if (type === "answer") {
        query.answer = itemId;
      }
      const exisitingInteraction = await client.checkQuestionViewed({
        questionId: itemId,
        ownerId: userId,
      });
      if (
        exisitingInteraction.interactionsByQuestionIdAndOwnerId?.items.length
      ) {
        return;
      }

      // update view count for question
      if (type === "question") {
        await Promise.all([
          client.createQuestionAction({
            ownerId: "userId", //? sending static value for ownerId since its required, the actual value gets overridden in the vtl
            targetUserId: userId,
            questionId: itemId,
            actionType: InteractionType.ViewQuestion,
            pointsSelf: POINT_SYSTEM_SELF[InteractionType.ViewQuestion],
            pointsTarget: POINT_SYSTEM_OTHER[InteractionType.ViewQuestion],
          }),
          client.viewQuestion({ questionId: itemId }),
        ]);
      } else if (type === "answer") {
        // TODO: update view count for answer
        // await client.createAnswerAction({
        //   userId,
        //   answerId: itemId,
        //   actionType: InteractionType.ViewAnswer,
        // })
      }
      // await Interaction.create({
      //   user: userId,
      //   action: "view",
      //   question: type === "question" ? [itemId] : undefined,
      //   answer: type === "answer" ? [itemId] : undefined,
      // });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error updating view count");
  }
}
