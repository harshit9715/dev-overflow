"use server";

import Tag from "../database/tag.model";
import User from "../database/user.model";
import { SearchableSortDirection } from "../gql/types";
import { getGraphQLClient } from "../graphql-client";
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

export async function getAllTags(params: GetAllTagsParams) {
  try {
    const { searchQuery, filter, page = 1, pageSize = 20 } = params;
    const client = await getGraphQLClient();

    let sortAndFilterOptions = {};

    switch (filter) {
      case "recent":
        sortAndFilterOptions = {
          sortField: "createdAt",
          sortDir: SearchableSortDirection.Desc,
        };
        break;
      case "old":
        sortAndFilterOptions = {
          sortField: "createdAt",
          sortDir: SearchableSortDirection.Asc,
        };
        break;
      case "popular":
        sortAndFilterOptions = {
          sortField: "questionCount",
          sortDir: SearchableSortDirection.Desc,
        };
        break;
      case "name":
        sortAndFilterOptions = {
          sortField: "label",
          sortDir: SearchableSortDirection.Asc,
        };
        break;
      default:
        break;
    }

    if (searchQuery) {
      sortAndFilterOptions = {
        ...sortAndFilterOptions,
        filter: {
          or: [
            {
              name: {
                matchPhrasePrefix: searchQuery,
              },
            },
            {
              username: {
                matchPhrasePrefix: searchQuery,
              },
            },
          ],
        },
      };
    }

    const skip = (page - 1) * pageSize;
    const tags = await client.getAllTags({
      limit: pageSize,
      skip,
      ...sortAndFilterOptions,
    });
    const totalUsers = tags.searchTags?.total || 0;
    const isNext = totalUsers > page * pageSize;
    return { tags: tags.searchTags!.items, isNext };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching users");
  }
}

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

export const getPopularTagsOld = async () => {
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

export const getPopularTags = async () => {
  try {
    const client = await getGraphQLClient();
    const { searchTags } = await client.popularTags();
    return { populatTags: searchTags?.items || [] };
  } catch (error) {
    console.error(error);
    throw new Error("Error getting popular tags");
  }
};
