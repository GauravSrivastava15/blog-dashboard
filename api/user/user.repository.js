import { compareHashPassword } from "../utils/hashPassword.js";
import { userSchema } from "./user.schema.js";
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
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (!existingUser) {
      return {
        success: false,
        error: { statusCode: 404, msg: "user not found" },
      };
    } else {
      let passwordValidation = await compareHashPassword(
        userData.password,
        existingUser.password
      );
      if (passwordValidation) {
        return { success: true, res: existingUser };
      } else {
        return {
          success: false,
          error: { statusCode: 404, msg: "invalid credentials" },
        };
      }
    }
  } catch (err) {
    return { success: false, error: { statusCode: 500, msg: err } };
  }
};
