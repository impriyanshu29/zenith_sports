import asyncHandler from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";

const userLists = asyncHandler(async(req,res,next)=>{
    const startIndex = parseInt(req.query.startIndex)||0;
    const limit = parseInt(req.query.limit)||6;
    const sortDirection = req.query.order === 'asc' ?  1 :-1;
    const totalUsers = await User.countDocuments();
    const users = await User.find()
        .select("-password -refreshToken")
        .sort({ createdAt: sortDirection }) 
        .skip(startIndex)
        .limit(limit);

    return res.status(201).json(
        new apiResponse(
          201,
          {
            users:{ users,totalUsers}
          },
          "Users fetched successfully"
        )
      )
})
const isAdmin = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
 
  try {
    if(!req.user.isAdmin ){
      return res.status(403).json({
        error: "You are not authorized to perform this action"
    });
    }
      const user = await User.findById (userId);
      const updatedUser = await User.findByIdAndUpdate(userId, { isAdmin: !user.isAdmin }, { new: true }).select("-password -refreshToken");

      
      return res.status(201).json(new apiResponse(
          201,
          {
              user: updatedUser,
          },
          "Hey you have updated admin in your team ‼️"
      ));
  } catch (error) {
      
      return res.status(500).json({
          error: "Internal server error"
      });
  }
});

const deleteUser = asyncHandler(async (req, res, next) => {
  
  try {
    if(!req.user.isAdmin ){
      return res.status(403).json({
        error: "You are not authorized to perform this action"
    });
    }
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new apiError(404, "Hey !! I think these user profile is already deleted");
    }
    res.status(200).json({
      message: "Sad!! to see that number of Users decreased",
    });
  }catch (error) {
      console.error(error);
      return res.status(500).json({
          error: "Internal server error"
      });
  }
});
export {userLists,isAdmin,deleteUser};
