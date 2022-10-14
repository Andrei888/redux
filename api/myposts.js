import express from "express";
import { check, validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import JsonWebToken from "jsonwebtoken";
import User from "../models/User.js";
import Post from "../models/Post.js";
import "dotenv/config";
import auth from "../middleware/auth.js";

const router = express.Router();

// @route get api/get
// @description Test rout
// @access Public

router.get("/", [auth], async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  // sort the post by date

  const token = req.header("x-auth-token");
  //console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ msg: "you are not authorized to view this resource!" });
  }

  console.log(token);
  try {
    const decoded = JsonWebToken.verify(token, process.env.jwtSecret);
    req.user = decoded.user;
    console.log("user", req.user.id);
  } catch (error) {
    console.log("err", error);
  }

  try {
    const posts = await Post.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(posts);
  } catch (error) {}
});

// @route         PUT api/posts/:id
// @description   PUT post by id
// @access        Private
router.put(
  "/",
  [
    auth,
    [
      check("title", "Post title is required").not().isEmpty(),
      check("text", "Post content is required").not().isEmpty(),
    ],
  ],
  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(request.user.id).select("-password");
      const post = await Post.findById(request.params.post_id);

      // check if the user that edit the post is the owner
      // post.user is not of type string, but ObjectId
      if (post.user.toString() !== request.user.id) {
        return response
          .status(401)
          .json({ msg: "User not authorized to edit the post" });
      }

      if (!post) {
        return response.status(404).json({ msg: "Post not found" });
      }

      post.title = request.body.title;
      post.text = request.body.text;
      post.date = Date.now();
      await post.save();

      response.json(post);
    } catch (error) {
      console.error(error.message);
      // check if the id is in correct format
      if (error.kind == "ObjectId") {
        return response.status(404).json({ msg: "Post not found" });
      }
      response.status(500).send("Server error");
    }
  }
);

// @route         DELETE api/posts/:id
// @description   Delete post by id
// @access        Private - only logged in users can see all posts from all users
router.delete("/:post_id", auth, async (request, response) => {
  // sort the post desceding by added date
  try {
    const post = await Post.findById(request.params.post_id);

    // check if the user that delete the post is the owner
    // post.user is not of type string, but ObjectId
    if (post.user.toString() !== request.user.id) {
      return response
        .status(401)
        .json({ msg: "User not authorized to delete the post" });
    }

    await post.remove();

    response.json({ msg: "Post removed" });
  } catch (error) {
    console.error(error.message);
    // check if the id is in correct format
    if (error.kind == "ObjectId") {
      return response.status(404).json({ msg: "Post not found" });
    }
    response.status(500).send("Server error");
  }
});

export default router;
