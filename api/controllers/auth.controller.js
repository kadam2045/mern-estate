import User from "../models/user.model.js";
import bcrypt, { hashSync } from "bcrypt";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { userName, email, password } = req.body;
  console.log(req.body);
  const hashPassword = hashSync(password, 10);
  const newUser = new User({ userName, email, password: hashPassword });
  console.log("uusername", newUser);
  try {
    await newUser.save();
    res.status(400).json("user Created SucessFully");
  } catch (error) {
    next(error);
  }
};
