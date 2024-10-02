import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signUp = async (req, res, next) => {
  const { userName, email, passWord } = req.body;
  try {
    if (
      !userName ||
      !email ||
      !passWord ||
      userName.trim() === "" ||
      email.trim() === "" ||
      passWord.trim() === ""
    ) {
      return next(errorHandler(400, "All fields are required...!"));
    }

    const cleanedUserName = userName.replace(/\s+/g, "");
    const randomNumber = Math.floor(Math.random() * 1000);
    const finalUserName = cleanedUserName + randomNumber;

    const hashedPassWord = bcryptjs.hashSync(passWord, 10);

    const newUser = new User({
      userName: finalUserName,
      email,
      passWord: hashedPassWord,
    });

    await newUser.save();

    res.json({ message: "SignUp Successful...!" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, passWord } = req.body;

  if (!email || !passWord || email === "" || passWord === "") {
    return next(errorHandler(400, "All fields are required...!"));
  }
  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "Email not matched...!"));
    }
    const validatePassword = bcryptjs.compareSync(passWord, validUser.passWord);
    if (!validatePassword) {
      return next(errorHandler(400, "Password not matched...!"));
    }
    const token = jwt.sign({ id: validUser._id , isAdmin :validUser.isAdmin }, process.env.JWT_SECRET);

    const { passWord: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error.message);
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { passWord, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const randomPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassWord = bcryptjs.hashSync(randomPassword, 10);
      const newUser = new User({
        userName:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        passWord: hashedPassWord,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id ,isAdmin:newUser.isAdmin }, process.env.JWT_SECRET);
      const { passWord, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
