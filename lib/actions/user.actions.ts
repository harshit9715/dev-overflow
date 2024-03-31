"use server";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import Answer from "../database/answer.model";
import Question, { IQuestion } from "../database/question.model";
import Tag from "../database/tag.model";
import User, { IUser } from "../database/user.model";
import { connectDatabase } from "../mongoose";
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
    // const {page=1, pageSize=20, filter, searchQuery} = params;
    const users = await User.find({}).sort({ createdAt: -1 });
    return { users };
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
    const { clerkId, filter, page = 1, pageSize = 30, searchQuery } = params;
    const questionFilter: FilterQuery<IQuestion> = { author: clerkId };
    const user = await User.findOne(questionFilter).populate({
      path: "saved",
      model: Question,
      match: searchQuery
        ? // @ts-ignore
          { title: { $regex: new RegExp(searchQuery, "i") } }
        : {},
      options: {
        sort: { createdAt: -1 },
        limit: pageSize,
        skip: pageSize * (page - 1),
      },
      populate: [
        { path: "author", Model: User, select: "_id clerkId name picture" },
        { path: "tags", Model: Tag, select: "_id name" },
      ],
    });

    if (!user) {
      throw new Error("User not found");
    }

    // const savedQuestions = await Question.find({
    //   _id: { $in: user.saved },
    // })
    //   .populate("author")
    //   .populate("tags")
    //   .sort({ createdAt: -1 })
    //   .limit(pageSize)
    //   .skip(pageSize * (page - 1));

    return { savedQuestions: user.saved };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching saved questions");
  }
};

export const getUserQuestions = async (params: GetUserStatsParams) => {
  try {
    connectDatabase();
    const { userId, page = 1, pageSize = 10 } = params;

    const totalQuestions = await Question.countDocuments({ author: userId });

    const userQuestions = await Question.find({ author: userId })
      .sort({
        views: -1,
        upvotes: -1,
      })
      .populate("tags", "_id name")
      .populate("author", "_id clerkId name picture")
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    return { questions: userQuestions, totalQuestions };
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
    const userAnswers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .populate("question", "_id title")
      .populate("author", "_id clerkId name picture");

    return { answers: userAnswers, totalAnsweredQuestions };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch answers");
  }
};

export const getUserStats = async (params: GetUserStatsParams) => {
  try {
    connectDatabase();
    const { userId } = params;
    const [totalQuestions, totalAnswers] = await Promise.all([
      Question.countDocuments({ author: userId }),
      Answer.countDocuments({ author: userId }),
    ]);

    return { totalQuestions, totalAnswers };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching user stats");
  }
};
