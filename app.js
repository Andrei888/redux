import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import "dotenv/config";

import authRouter from "./api/auth.js";
import postsRouter from "./api/posts.js";
import usersRouter from "./api/users.js";

const app = express();
app.use(bodyParser.json());
// route

app.get("/", (req, res) => res.send("Hello social"));
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (res, req) => {
    req.sendFile(path.rezolve(__dirname, "build", "index.html"));
  });
}

// start

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connected to MongoDB", error);
  }
};

connectDB();

app.listen(process.env.PORT || 5000);
