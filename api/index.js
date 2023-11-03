import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log("mongo db is connected ");
});

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api", userRoute);
app.use("/api/auth", authRoute);

app.get("/demo", (req, res) => {
  res.send("hello");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    sucess: false,
    statusCode,
    message,
  });
  console.log(err, "myyyy");
});

app.listen(3002, () => {
  console.log("server is running");
});
