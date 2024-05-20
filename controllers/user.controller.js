import { User } from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isStrongPassword(password) {
  const lowercase = /[a-z]/.test(password);
  const uppercase = /[A-Z]/.test(password);
  const number = /[0-9]/.test(password);
  const special = /[@,#,$,%,&,*]/.test(password);
  const length = password.length >= 8;
  return lowercase && uppercase && number && special && length;
}

export const registerUser = asyncHandler(async (req, res,next) => {
  res.json({
    message: "Api is working !!",
  });
});

export const updateUser = asyncHandler(async (req, res, next) => {

  if (req.user._id.toString() !== req.params.userId) {
    throw new apiError(401, "Unauthorized acess");
  }
  
 
  if (req.body.password) {
    if (!isStrongPassword(req.body.password)) {
      throw new apiError(
        400,
        "Password must contain a-z,A-Z,0-9, special character and length must be greater than 8"
      );
    }
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      throw new apiError(
        400,
        "Username must be greater than 7 and less than 14"
      );
    }
  
  if (req.body.username.includes(" ")) {
    throw new apiError(400, "Username must not contain space");
  }

  if (req.body.username !== req.body.username.toLowerCase()) {
    throw new apiError(400, "Username must be in lowercase");
  }
  const trimmedUsername = req.body.username.trim();

  if (!trimmedUsername.match(/^[a-zA-Z0-9]+$/)) {
    throw new apiError(
      400,
      "Username must contain only alphabets and numbers"
    );
  }

  const username = await User.findOne({ username: trimmedUsername });
  if (username && username._id.toString() !== req.params.userId) {
    throw new apiError(400, "Username already exists");
  }
}
  if (req.body.email) {
    if (!isValidEmail(req.body.email)) {
      throw new apiError(400, "Please enter a valid email");
    }
  }
  

  try {
    const updateFields = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      coverImage: req.body.coverImage,
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: updateFields,
      },
      { new: true }
    );
    

    const loggedInUser = await User.findById(req.user._id).select(
        "-password -refreshToken"
    );
    
    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)

        .json(
        new apiResponse(
            200,
            {
            user: loggedInUser,
            },
            "Updated sucessfully",

        )
          
        ); 
  } catch (error) {
    next(error);
  }
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  if (req.user._id.toString() !== req.params.userId) {
    throw new apiError(401, "Good try !! but you can't delete other's account");
  }
  const user = await User.findByIdAndDelete(req.params.userId);
  if (!user) {
    throw new apiError(404, "Hey !! I think these account is already deleted");
  }
  res.status(200).json({
    message: "See you soon !!",
  });
});
