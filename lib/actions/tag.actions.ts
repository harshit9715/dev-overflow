"use server";

import { FilterQuery } from "mongoose";
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
  page = 1,
  pageSize = 20,
  searchQuery,
}: GetAllTagsParams) => {
  try {
    connectDatabase();

    let sortoptions = {};
    const skip = (page - 1) * pageSize;
    switch (filter) {
      case "popular":
        sortoptions = { questions: -1 };
        break;
      case "recent":
        sortoptions = { createdAt: -1 };
        break;
      case "name":
        sortoptions = { name: 1 };
        break;
      case "old":
        sortoptions = { createdAt: 1 };
        break;
      default:
        break;
    }
    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }
    const tags = await Tag.find(query)
      .skip(skip)
      .limit(pageSize)
      .sort(sortoptions);
    const totalResults = await Tag.countDocuments(query);
    const isNext = totalResults > skip + tags.length;
    return { tags, isNext };
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
