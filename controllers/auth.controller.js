import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

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

function generateRandomPassword(length) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let password = "";

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * charset.length);
    password = password + charset.charAt(index);
  }

  return password;
}

const generate_acessToken_and_refreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAcessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(500, "Something went wrong");
    console.log(error);
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new apiError(400, "All fields are required");
  }
  if (!isValidEmail(email)) {
    throw new apiError(400, "Please enter a valid email");
  }

  if (!isStrongPassword(password)) {
    throw new apiError(
      400,
      "Password must contain a-z,A-Z,0-9, special character and length must be greater than 8"
    );
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new apiError(400, "User already exist...");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new apiError(500, "Something went wrong");
  }

  await user.save();
  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "User register succesfully "));
});

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const signin = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  if ((!username && !email) || (username == " " && email == "")) {
    throw new apiError(400, "Username or Email is required");
  }

  if (!password || password == " ") {
    throw new apiError(400, "Password field is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new apiError(401, "User did not found");
  }

  const isPasswordMatch = await user.isPasswordMatch(password);
  if (!isPasswordMatch) {
    throw new apiError(401, "Wrong Password");
  }
  const { accessToken, refreshToken } =
    await generate_acessToken_and_refreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("acessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "logged in sucessfully"
      )
    );
});

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const google = asyncHandler(async (req, res) => {
  const { name, email, googlePhoto } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const { accessToken, refreshToken } =
        await generate_acessToken_and_refreshToken(user._id);
      const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
      );

      const options = {
        httpOnly: true,
        secure: true,
      };

      return res
        .status(200)
        .cookie("acessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
          new apiResponse(
            200,
            {
              user: loggedInUser,
              accessToken,
              refreshToken,
            },
            "logged in sucessfully"
          )
        );
    } else {
      const newPassword = generateRandomPassword(10);
      const newUser = await User.create({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-5),
        email,
        password: newPassword,
        coverImage: googlePhoto,
      });

      const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
      );
      if (!createdUser) {
        throw new apiError(500, "User Not Created");
      }

      await newUser.save();

      const loggedInUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
      );

      const options = {
        httpOnly: true,
        secure: true,
      };

      return res
        .status(200)
        .cookie("acessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
          new apiResponse(
            200,
            {
              user: loggedInUser,
              accessToken,
              refreshToken,
            },
            "logged in sucessfully"
          )
        );
    }
  } catch (error) {
    throw new apiError(error);
  }
});
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  };

  return res
    .status(200)
    .clearCookie("acessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, undefined, "Logged out successfully"));
});

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const refreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
 
  if (!incomingRefreshToken) {
    throw new apiError(401, "Really !Unauthorized acess");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  
      const user = await User.findById(decodedToken?._id);
      if(!user){
          throw new apiError(401,"User not found")
      }
      if(incomingRefreshToken !== user?.refreshToken){
          throw new apiError(401,"Refresh Token Expired")
      }
  
      const options = {
          httpOnly: true,
          secure: true,
      };
      const {accessToken,newRefreshToken} = await generate_acessToken_and_refreshToken(user._id);
      return res
      .status(200)
      .cookie("acessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
              new apiResponse(
                  200,
                  {accessToken,newRefreshToken},
                  "Token Refreshed Successfully"
                  ));
  
  } catch (error) {
        throw new apiError(401,error?.message||"Not authorized, token failed")
    
  }
});
