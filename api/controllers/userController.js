import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
export const Users = (req, res) => {
  res.json("hello");
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You can not update the user...!"));
  }
  if (req.body.passWord) {
    if (req.body.passWord.length < 6) {
      return next(errorHandler(400, "password must be at least 6 characters"));
    }
    req.body.passWord = bcryptjs.hashSync(req.body.passWord, 10);
  }
  if (req.body.userName) {
    if (req.body.userName.lengeth < 7 || req.body.userName.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 t0 20 characters")
      );
    }
    if (req.body.userName.includes(" ")) {
      return next(errorHandler(400, "Username cannot contains spaces"));
    }
    if (req.body.userName !== req.body.userName.toLowerCase()) {
      return next(errorHandler(400, "Username must contain lowercase"));
    }
    if (!req.body.userName.match(/^[a-zA-Z0-9]+$/)) {
      return next(errorHandler(400, "Cannot use special characters"));
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          passWord: req.body.passWord,
        },
      },
      { new: true }
    );
    const { passWord, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async(req , res , next)=>{
      if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return next(errorHandler(403 , "You can not delete this account"))
      }
      try {
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json("User deleted sucessfull")
      } catch (error) {
        next(error)
      }
}

export const signOut = async (req , res , next)=>{
  try {
   await res.clearCookie("access_token").status(200).json("User signout is successfull")
  } catch (error) {
    next(error)
  }
}

export const getusers =async(req , res  ,next ) =>{
 if (!req.user.isAdmin) {
  next(errorHandler(403 , "you are not allowed to get all users"))
 }
 try {
  const startIndex = parseInt(req.query.startIndex) ||0;
  const limit = parseInt(req.query.limit)||9;
  const sortDirection = req.query.sort === "asc" ? 1:-1;
   
  const users= await User.find()
  .sort({updatedAt : sortDirection})
  .skip(startIndex)
  .limit(limit) 
   const usersWithoutPassword = users.map((user) =>{
    const {passWord , ...rest} =user._doc;
    return rest
  })
  const totalUsers =await User.countDocuments()
   const now =new Date()
   const oneMonthAgo= new Date(
    now.getFullYear(),
    now.getMonth() -1,
    now.getDate()
   ) 
   
   const lastMonthUsers = await User.countDocuments({
    createdAt: { $gte: oneMonthAgo },
  });

  res.status(200).json({
    users: usersWithoutPassword,
    totalUsers,
    lastMonthUsers,
  });
 } catch (error) {
  next(error)
 }
}

export const getUser =async( req , res , next) =>{
    try {
      const user = await User.findById(req.params.userId)
      if (!user) {
        next(errorHandler(403 , "User not found..."))
      }
      const {passWord , ...rest} = user._doc
      res.status(200).json(rest)

    } catch (error) {
      next(error)
    }
}