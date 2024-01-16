import express from "express";
import mongoose from "mongoose";
import { userSignUpRepo, userSingInRepo } from "./user.repository.js";
import bcrypt from "bcrypt";
import { customErrorHandler } from "../middleware/errorHandler.js";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/jwtAuth.js";

export const userSignUp = async (req, res) => {
  let { password } = req.body;
  console.log(password);
  password = await bcrypt.hash(password, 12);
  const resp = await userSignUpRepo({ ...req.body, password });
  if (resp.success) {
    res.status(200).json({ msg: "User created", res: resp.res });
  } else {
    res.status(500).send("user not created");
  }
};

export const userSignIn = async (req, res, next) => {
  const resp = await userSingInRepo(req.body);
  if (resp.success) {
    const token = jwt.sign({ _id: resp.res._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = resp.res._doc;
    res
    .cookie("jwtToken", token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true })
    .status(200)
    .json({ success: true, msg: "user login succesfull", rest });
    
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

