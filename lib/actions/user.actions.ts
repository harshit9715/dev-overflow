"use server";
import { BadgeCriteriaType } from "@/types";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import Answer from "../database/answer.model";
import Question, { IQuestion } from "../database/question.model";
import Tag from "../database/tag.model";
import User, { IUser } from "../database/user.model";
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

export async function getUserById(params: GetUserByIdParams) {
  try {
    connectDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user as IUser;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching user");
  }
}

export async function createUser(params: CreateUserParams) {
  try {
    connectDatabase();
    const user = await User.create(params);
    return user as IUser;
  } catch (error) {
    console.log(error);
    return null;
    // throw new Error("Error creating user");
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectDatabase();
    const { clerkId, updateData, path } = params;
    const user = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
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
    connectDatabase();
    const { searchQuery, filter, page = 1, pageSize = 20 } = params;
    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "new_users":
        sortOptions = { joinedAt: -1 };
        break;
      case "old_users":
        sortOptions = { joinedAt: 1 };
        break;
      case "top_contributors":
        sortOptions = { reputation: -1 };
        break;
      default:
        break;
    }
    const skip = (page - 1) * pageSize;
    const users = await User.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);
    const totalUsers = await User.countDocuments(query);
    const isNext = totalUsers > skip + users.length;
    return { users, isNext };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching users");
  }
}

export const saveQuestion = async (params: ToggleSaveQuestionParams) => {
  try {
    connectDatabase();
    const { userId, questionId, path } = params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.saved.includes(questionId)) {
      await user.updateOne({ $pull: { saved: questionId } });
    } else {
      await user.updateOne({ $push: { saved: questionId } });
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error("Error saving question");
  }
};

export const getAllSavedQuestions = async (params: GetSavedQuestionsParams) => {
  try {
    connectDatabase();
    const { clerkId, page = 1, pageSize = 15, searchQuery, filter } = params;

    let sortOptions = {};

    switch (filter) {
      case "most_recent":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "most_voted":
        sortOptions = { upvotes: -1 };
        break;
      case "most_viewed":
        sortOptions = { views: -1 };
        break;
      case "most_answered":
        sortOptions = { answers: -1 };
        break;
      default:
        break;
    }

    const skip = (page - 1) * pageSize;

    const questionFilter: FilterQuery<IQuestion> = { author: clerkId };
    const user = await User.findOne(questionFilter).populate({
      path: "saved",
      model: Question,
      match: searchQuery
        ? // @ts-ignore
          { title: { $regex: new RegExp(searchQuery, "i") } }
        : {},
      options: {
        sort: sortOptions,
        limit: pageSize + 1,
        skip,
      },
      populate: [
        { path: "author", Model: User, select: "_id clerkId name picture" },
        { path: "tags", Model: Tag, select: "_id name" },
      ],
    });
    if (!user) {
      throw new Error("User not found");
    }
    const isNext = user.saved.length > pageSize;

    return { savedQuestions: user.saved.slice(0, pageSize), isNext };
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
