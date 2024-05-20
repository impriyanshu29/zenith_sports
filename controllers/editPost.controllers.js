import {Post} from "../models/post.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import {apiResponse} from "../utils/apiResponse.js";

const editPost = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin && req.user._id.toString() !== req.params.userId) {
    throw new apiError(403, "Oops !! Sorry but you are not allowed");
  }
  const post = await Post.findByIdAndUpdate(
    req.params.postId, 
    {
        $set:{
            title: req.body.title,
            
            content:req.body.content,
            image:req.body.image,
            
            category: req.body.category,
        
        }
    },
    {
    new: true,
    }
);
  if (!post) {
    throw new apiError(404, "Hey !! I think these post is already updated");
  }

  try{
  const UpdatedPost = await Post.findById(post._id).select("-__v");
  if (!UpdatedPost) {
    throw new apiError(500, "Post not updated");
  }

  const options = {
    httpOnly: true,
    secure: true,
};
 return res.status(201).json(
    new apiResponse(
      201,
      {
        post: UpdatedPost,
      },
      "Post updated successfully"
    )
  )
    }
    catch (error) {
        next(error);
      };
});

export default editPost;
