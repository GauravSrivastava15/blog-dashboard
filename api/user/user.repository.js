import { userSchema } from "./user.schema";
import mongoose from "mongoose";

const UserModel = mongoose.model("User", userSchema);

export const userSignUpRepo = async (userData) => {
  try {
    const newUser = new UserModel(userData);
    await newUser.save();
    return { success: true, res: newUser };
  } catch (err) {
    return { success: false, error: { statusCode: 500, msg: err } };
  }
};

export const userSingInRepo = async (userData) => {
  try {
    const existingUser = await UserModel.find({ email: userData.email });
  } catch (err) {
    return { success: false, error: { statusCode: 500, msg: err } };
  }
};
