import apiError from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Post } from "../models/post.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const createpost = asyncHandler (async(req, res) => {
  
    if (!req.user.isAdmin) {
      throw new apiError(403, "Unauthorized access");
    }

    if (!req.body.title || !req.body.content) {
      throw new apiError(400, "Please provide all the fields");
    }

    if (req.body.title.length < 5) {
      throw new apiError(400, "Title must be greater than 5");
    }

    if (req.body.content.length < 20) {
      throw new apiError(400, "Content must be greater than 20");
    }

    const existingPost = await Post.findOne({ title: req.body.title });

    if (existingPost) {
      throw new apiError(400, "A post with the same title already exists");
    }

    const slug = req.body.title
      .toLowerCase()
      .split(" ")
      .join("-")
      .replace(/[^a-zA-Z0-9-]/g, "");
    const post = await Post.create({ ...req.body, slug, userId: req.user._id,adminImage:req.user.coverImage,adminName:req.user.username });
    const createdPost = await Post.findById(post._id).select("-__v");

    if (!createdPost) {
      throw new apiError(500, "Post not created");
    }

    return res.status(201).json(
      new apiResponse(
        201,
        {
          post: createdPost,
        },
        "Post created successfully"
      )
    );
  
});

export default createpost;
