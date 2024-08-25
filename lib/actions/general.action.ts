"use server";

import Answer from "../database/answer.model";
import Question from "../database/question.model";
import Tag from "../database/tag.model";
import User from "../database/user.model";
import { connectDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";

const searchableTypes = ["question", "user", "answer", "tag"];

export async function globalSearch({ query, type }: SearchParams) {
  try {
    await connectDatabase();
    const regexQuery = { $regex: query, $options: "i" };
    let results = [];

    const modelAndTypes = [
      {
        model: Question,
        searchField: "title",
        type: "question",
      },
      {
        model: User,
        searchField: "name",
        type: "user",
      },
      {
        model: Answer,
        searchField: "content",
        type: "answer",
      },
      {
        model: Tag,
        searchField: "name",
        type: "tag",
      },
    ];

    const typeLower = type?.toLowerCase();
    if (!typeLower || !searchableTypes.includes(typeLower)) {
      // Search across everything
      for (const { model, searchField, type } of modelAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((result) => ({
            title:
              type === "answer"
                ? `Answers containing ${query}`
                : result[searchField],
            type,
            id:
              type === "user"
                ? result.clerkId
                : type === "answer"
                  ? result.question
                  : result._id,
          })),
        );
      }
    } else {
      // Search only in the specified type
      const modelInfo = modelAndTypes.find((m) => m.type === typeLower);
      if (!modelInfo) {
        throw new Error("Invalid search type");
      }

      const queryResult = await modelInfo.model
        .find({
          [modelInfo.searchField]: regexQuery,
        })
        .limit(8);

      results = queryResult.map((result) => ({
        title:
          type === "answer"
            ? `Answers containing ${query}`
            : result[modelInfo.searchField],
        type,
        id:
          type === "user"
            ? result.clerkId
            : type === "answer"
              ? result.question
              : result._id,
      }));
    }
    return JSON.stringify(results);
  } catch (error) {
    console.error("Error in globalSearch: ", error);
    throw new Error("Error in globalSearch");
  }
}

export async function fetchOpenAICompletion(content: string) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an expert software developer. You are helping a junior developer understand a complex concept.",
        },
        {
          role: "user",
          content,
        },
      ],
    }),
  });
  return response.json();
}
