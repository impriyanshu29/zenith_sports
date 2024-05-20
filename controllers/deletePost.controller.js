import { Post } from "../models/post.model.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const deletePost = asyncHandler(async(req,res)=>{
    if(!req.user.isAdmin && req.user._id.toString() !== req.params.userId){
        throw new apiError(403 , "Oops !! Sorry but you are not allowed")
    }
    const post = await Post.findByIdAndDelete(req.params.postId);
    if (!post) {
        throw new apiError(404, "Hey !! I think these post is already deleted");
      }
      res.status(200).json({
        message: "Thanks!! for freeing up space in DB!!",
      });

})

export default deletePost