"use server";
import { BadgeCriteriaType } from "@/types";
import { revalidatePath } from "next/cache";
import Answer from "../database/answer.model";
import Question from "../database/question.model";
import User, { IUser } from "../database/user.model";
import { InteractionType, SearchableSortDirection } from "../gql/types";
import { getGraphQLClient } from "../graphql-client";
import { connectDatabase } from "../mongoose";
import { assignBadge } from "../utils";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";

export async function updateUser(params: UpdateUserParams) {
  try {
    const client = await getGraphQLClient();
    const { userId, updateData, path } = params;
    const user = await client.updateProfile({
      id: userId,
      ...updateData,
    });
    revalidatePath(path);
    return user as IUser;
  } catch (error) {
    console.log(error);
    return null;
    // throw new Error("Error updating user");
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectDatabase();
    const { clerkId } = params;
    const user = await User.findOne({ clerkId });

    if (!user) {
      // throw new Error("User not found");
      return null;
    }

    // delete everything related to the user
    // questions, answers, comments, etc

    // get user question ids
    const userQuestionIds = await Question.find({ author: user._id }).distinct(
      "_id"
    );

    await Question.deleteMany({ author: user._id });

    // Todo: delete user answers, comments, etc
    console.log("User question ids", userQuestionIds);

    // delete user
    const deletedUser = await User.findOneAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting user");
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    const { searchQuery, filter, page = 1, pageSize = 20 } = params;
    const client = await getGraphQLClient();

    let sortAndFilterOptions = {};

    switch (filter) {
      case "new_users":
        sortAndFilterOptions = {
          sortField: "createdAt",
          sortDir: SearchableSortDirection.Desc,
        };
        break;
      case "old_users":
        sortAndFilterOptions = {
          sortField: "createdAt",
          sortDir: SearchableSortDirection.Asc,
        };
        break;
      case "top_contributors":
        sortAndFilterOptions = {
          sortField: "reputation",
          sortDir: SearchableSortDirection.Desc,
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
    const users = await client.getCommunityMembers({
      limit: pageSize,
      skip,
      ...sortAndFilterOptions,
    });
    const totalUsers = users.searchUsers?.total || 0;
    const isNext = totalUsers > page * pageSize;
    return { users: users.searchUsers!.items, isNext };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching users");
  }
}

export const saveQuestion = async (params: ToggleSaveQuestionParams) => {
  try {
    const { path, questionId, userId, saveId } = params;
    const client = await getGraphQLClient();
    if (saveId) {
      await client.deleteInteraction({ actionId: saveId });
    } else {
      await client.createQuestionAction({
        questionId,
        ownerId: userId,
        pointsSelf: 0,
        actionType: InteractionType.SaveQuestion,
      });
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error("Error saving question");
  }
};

export const getAllSavedQuestions = async (params: GetSavedQuestionsParams) => {
  try {
    const client = await getGraphQLClient();
    const { userId, page = 1, pageSize = 15, searchQuery, filter } = params;

    // let sortOptions = {};

    // switch (filter) {
    //   case "most_recent":
    //     sortOptions = { createdAt: -1 };
    //     break;
    //   case "oldest":
    //     sortOptions = { createdAt: 1 };
    //     break;
    //   case "most_voted":
    //     sortOptions = { upvotes: -1 };
    //     break;
    //   case "most_viewed":
    //     sortOptions = { views: -1 };
    //     break;
    //   case "most_answered":
    //     sortOptions = { answers: -1 };
    //     break;
    //   default:
    //     break;
    // }

    const questions = await client.savedQuestions({
      ownerId: userId,
    });

    return {
      savedQuestions:
        questions.interactionsByOwnerIdAndCreatedAt?.items
          .map((i) => i?.question)
          .filter((i) => !!i) || [],
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching saved questions");
  }
};

export const getUserQuestions = async (params: GetUserStatsParams) => {
  try {
    connectDatabase();
    const { userId, page = 1, pageSize = 10 } = params;

    const skip = (page - 1) * pageSize;
    const totalQuestions = await Question.countDocuments({ author: userId });

    const userQuestions = await Question.find({ author: userId })
      .sort({
        views: -1,
        upvotes: -1,
      })
      .populate("tags", "_id name")
      .populate("author", "_id clerkId name picture")
      .skip(skip)
      .limit(pageSize);

    const isNext = totalQuestions > skip + userQuestions.length;
    return { questions: userQuestions, totalQuestions, isNext };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching user questions");
  }
};

export const getAllAnsweredQuestions = async ({
  userId,
  page = 1,
  pageSize = 10,
}: GetUserStatsParams) => {
  try {
    connectDatabase();
    const totalAnsweredQuestions = await Answer.countDocuments({
      author: userId,
    });
    const skip = (page - 1) * pageSize;
    const userAnswers = await Answer.find({ author: userId })
      .skip(skip)
      .limit(pageSize)
      .sort({ upvotes: -1 })
      .populate("question", "_id title")
      .populate("author", "_id clerkId name picture");

    const isNext = totalAnsweredQuestions > skip + userAnswers.length;
    return { answers: userAnswers, totalAnsweredQuestions, isNext };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch answers");
  }
};

export const getUserStats = async (params: GetUserStatsParams) => {
  try {
    connectDatabase();
    const { userId } = params;
    const [
      totalQuestions,
      totalAnswers,
      [questionUpvotes],
      [answerUpvotes],
      [questionViews],
    ] = await Promise.all([
      Question.countDocuments({ author: userId }),
      Answer.countDocuments({ author: userId }),
      Question.aggregate([
        { $match: { author: userId } },
        { $project: { _id: 0, upvotes: { $size: "$upvotes" } } },
        { $group: { _id: null, totalUpvotes: { $sum: "$upvotes" } } },
      ]),
      Answer.aggregate([
        { $match: { author: userId } },
        { $project: { _id: 0, upvotes: { $size: "$upvotes" } } },
        { $group: { _id: null, totalUpvotes: { $sum: "$upvotes" } } },
      ]),
      Question.aggregate([
        { $match: { author: userId } },
        { $project: { _id: 0, views: 1 } },
        { $group: { _id: null, totalViews: { $sum: "$views" } } },
      ]),
    ]);

    const criteria = [
      { type: "QUESTION_COUNT" as BadgeCriteriaType, count: totalQuestions },
      { type: "ANSWER_COUNT" as BadgeCriteriaType, count: totalAnswers },
      {
        type: "QUESTION_UPVOTES" as BadgeCriteriaType,
        count: questionUpvotes?.totalUpvotes || 0,
      },
      {
        type: "ANSWER_UPVOTES" as BadgeCriteriaType,
        count: answerUpvotes?.totalUpvotes || 0,
      },
      {
        type: "TOTAL_VIEWS" as BadgeCriteriaType,
        count: questionViews?.totalViews || 0,
      },
    ];

    const badgeCounts = assignBadge({ criteria });

    return { totalQuestions, totalAnswers, badgeCounts };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching user stats");
  }
};

export async function createUser(params: CreateUserParams) {
  try {
    const client = await getGraphQLClient();
    const user = await client.newDevFlowUser({
      clerkId: params.clerkId,
      email: params.email,
      name: params.name,
      username: params.username,
      picture: params.picture,
      rep: 0,
    });
    return user.createUser?.id;
  } catch (error) {
    console.log(error);
    return null;
    // throw new Error("Error creating user");
  }
}

export const getUserById = async (params: GetUserByIdParams) => {
  try {
    const client = await getGraphQLClient();
    const user = await client.getUserProfile({ userId: params.userId });
    return user.getUser;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching user");
  }
};
