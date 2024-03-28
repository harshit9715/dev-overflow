"use server";

import { revalidatePath } from "next/cache";
import Question from "../database/question.model";
import User, { IUser } from "../database/user.model";
import { connectDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";

export async function getUserById(params: any) {
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
    throw new Error("Error creating user");
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
    throw new Error("Error updating user");
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
