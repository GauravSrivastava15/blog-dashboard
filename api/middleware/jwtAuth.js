import express from "express";
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const { jwtToken } = req.cookies;
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, result) => {
    if (err) {
      res.status(400).send("unauthorized! login to continue!");
    } else {
      (req.user = result._id),
       next();
    }
  });
};
