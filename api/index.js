import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import postRoute from "./routes/postRoute.js";
import commentRoute from "./routes/commentRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config();
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
mongoose
  .connect(process.env.MongoDB)
  .then(() => {
    console.log("MongoDB Connection Sucessfull...!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", userRoute);
app.use("/api", authRoute);
app.use("/api", postRoute);
app.use("/api/comment",commentRoute)

app.listen(PORT, () => {
  console.log(`Server Started At :${PORT}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
