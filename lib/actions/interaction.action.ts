"use server";

import Answer from "../database/answer.model";
import Interaction from "../database/interaction.model";
import Question from "../database/question.model";
import { connectDatabase } from "../mongoose";
import { ViewItemParams } from "./shared.types";

export async function viewItem(params: ViewItemParams) {
  try {
    connectDatabase();
    const { type, itemId, userId } = params;
    console.log("Viewing item", type, itemId, userId);
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
      const exisitingInteraction = await Interaction.findOne(query);
      if (exisitingInteraction) return console.log("Already viewed");

      // update view count for question
      if (type === "question") {
        await Question.findByIdAndUpdate(itemId, { $inc: { views: 1 } });
      } else if (type === "answer") {
        // update view count for answer
        await Answer.findByIdAndUpdate(itemId, { $inc: { views: 1 } });
      }
      await Interaction.create({
        user: userId,
        action: "view",
        question: type === "question" ? [itemId] : undefined,
        answer: type === "answer" ? [itemId] : undefined,
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error updating view count");
  }
}
