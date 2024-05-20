import asyncHandler from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";
import { Achievment } from "../models/achievments.models.js";

const createAchievment = asyncHandler(async (req, res) => {
    if(!req.user.isAdmin){
        throw new apiError(403, "Unauthorized access");
    }
   

    if(!req.body.year||!req.body.title||!req.body.direction)
        {
            throw new apiError(400, "Please provide all the fields");
        }

    if(req.body.title.length<5){
        throw new apiError(400, "Title must be greater than 5");
    }

    const achievementsNew = await Achievment.create({...req.body});
    const createdAchievment = await Achievment.findById(achievementsNew._id).select("-__v");
   
    if(!createdAchievment){
        throw new apiError(500, "Achievment not created");
    }
    return res.status(201).json(
        new apiResponse(
            201,
            {
                achievment: createdAchievment,
            },
            "Hurray achieved one more milestone"
        )
    );
})

const deleteAchievments = asyncHandler(async(req,res)=>{
    if(!req.user.isAdmin && req.user._id !== req.params.userId){
        throw new apiError(403, "Unauthorized access");
    }
    const achievmentId = req.params.achievmentId;
    const achievment = await Achievment.findByIdAndDelete(achievmentId);
    if(!achievment){
        throw new apiError(404, "Achievment not found");
    }
    return res.status(200).json({
        message: "Sad to see that number of Achievments decreased 😢",
    });
})

const getAchievments = asyncHandler(async(req,res)=>{
    const limit = parseInt(req.query.limit)||10;
    const startIndex = parseInt(req.query.startIndex)||0;
    const sortDirection = req.query.order === 'asc'? 1:-1;

    const achievments = await Achievment.find({
        ...(req.query._id &&{_id:req.query._id}),
}).sort({year:sortDirection}).skip(startIndex).limit(limit);

    const totalAchievments = await Achievment.countDocuments();
    return res.status(201).json(
        new apiResponse(
            201,
            {
                achievments: {achievments,totalAchievments}
            },
            "Achievments fetched successfully"
        )
    )
})

const editAchievments = asyncHandler(async(req,res)=>{
    if(!req.user.isAdmin && req.user._id !== req.params.userId){
        throw new apiError(403, "Unauthorized access");
    }
    const achievmentId = req.params.achievmentId;
    const achievment = await Achievment.findById(achievmentId);
    if(!achievment){
        throw new apiError(404, "Achievment not found");
    }
    const updatedAchievment = await Achievment.findByIdAndUpdate(achievmentId,{...req.body},{new:true}).select("-__v");
    return res.status(201).json(
        new apiResponse(
            201,
            {
                achievment: updatedAchievment,
            },
            "Achievment updated successfully"
        )
    )
})
export {createAchievment,deleteAchievments,getAchievments,editAchievments};

