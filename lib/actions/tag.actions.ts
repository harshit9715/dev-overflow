"use server";

import Tag from "../database/tag.model";
import User from "../database/user.model";
import { connectDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";

export const getTopInteractedTags = async ({
  userId,
  limit = 3,
}: GetTopInteractedTagsParams) => {
  try {
    connectDatabase();
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Interactions...
    return [
      {
        _id: "1",
        name: "tag1",
      },
      {
        _id: "2",
        name: "tag2",
      },
      {
        _id: "3",
        name: "tag3",
      },
    ];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAllTags = async ({
  filter,
  page,
  pageSize,
  searchQuery,
}: GetAllTagsParams) => {
  try {
    connectDatabase();

    const tags = await Tag.find({});
    return { tags };
  } catch (error) {
    console.error(error);
    return { tags: [] };
  }
};

export const getTagByUserId = async ({ userId }: { userId: string }) => {
  try {
    connectDatabase();

    const tags = await Tag.find({ author: userId });
    return { tags };
  } catch (error) {
    console.error(error);
    return { tags: [] };
  }
};

export const getPopularTags = async () => {
  try {
    connectDatabase();

    const populatTags = await Tag.aggregate([
      {
        $project: {
          name: 1,
          numberOfQuestions: { $size: "$questions" },
        },
      },
      {
        $sort: { numberOfQuestions: -1 },
      },
      {
        $limit: 5,
      },
    ])
      .sort({ totalQuestions: -1 })
      .limit(5);
    return { populatTags };
  } catch (error) {
    console.error(error);
    throw new Error("Error getting popular tags");
  }
};
