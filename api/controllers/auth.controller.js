import User from "../models/user.model.js";
import bcrypt, { hashSync } from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const hashPassword = hashSync(password, 10);
  const newUser = new User({ userName, email, password: hashPassword });

  try {
    await newUser.save();
    res.status(400).json("user Created SucessFully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { userName, password } = req.body;
  try {
    const validUser = await User.findOne({ userName });
    if (!validUser) return next(errorHandler(600, " User not found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(502, "Invalid password"));
    console.log("jjsjsjsjssjsjs", validUser);
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: secret, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
