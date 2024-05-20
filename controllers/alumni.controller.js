import asyncHandler from "../utils/asyncHandler.js"
import apiError from "../utils/apiError.js";
import { Alumni } from "../models/alumini.model.js";
import { apiResponse } from "../utils/apiResponse.js";


export const createAlumin =asyncHandler(async(req,res)=>{
    if (!req.user.isAdmin) {
        throw new apiError(403, "Unauthorized access");
      }

    if(!req.body.firstname||!req.body.lastname ||!req.body.about){
        throw new apiError(400, "Please provide all the fields")
    }

    if (req.body.about.length < 15 && req.body.about.length >100 ) {
        throw new apiError(400, "Content must be greater than 15 anf less than 100");
      }

    const existedAlumni = await Alumni.findOne({
        $and:[{email:req.body.email},{firstname:req.body.firstname},{lastname:req.body.lastname}]
        
    })
    const timestamp = Date.now();
    if (existedAlumni) {
        throw new apiError(400, " A Alumni with same name already exists");
      }



      const slug = `${req.body.firstname|| ''.toLowerCase().split(" ").join("-")}-${timestamp}-${req.body.lastname}`;


      const alumni = await Alumni.create({...req.body,slug})

      const createdAlumni = await Alumni.findById(alumni._id).select("-__v");

    if (!createdAlumni) {
      throw new apiError(500, "Alumni not created");
    }

    return res.status(201).json(
      new apiResponse(
        201,
        {
          alumni: createdAlumni,
        },
        "Alumni created successfully"
      )
    );

})

export const getAlumni = asyncHandler(async(req,res,next)=>{
        const page = parseInt(req.query.page)||1;
        const limit = parseInt(req.query.limit)||6;
        let startIndex = (page - 1) * limit;
        if (req.query.startIndex) {
          startIndex = parseInt(req.query.startIndex);
      }

    const sortDirection = req.query.order === 'asc'? 1:-1;
    const alumnis = await Alumni.find({
      ...(req.query.alumniId && {_id:req.query.alumniId}),
      ...(req.query.slug &&{slug:req.query.slug}),
      ...(req.query.batch &&{batch:req.query.batch}),
      ...(req.query.searchAlumni &&{
        $or:[
          {firstname:{$regex:req.query.searchAlumni, $options:'i'}},
          {lastname:{$regex:req.query.searchAlumni, $options:'i'}},
                
        ],
      })
    }).sort({createdAt:sortDirection}).skip(startIndex).limit(limit);

    const totalAlumni = await Alumni.countDocuments();
    return res.status(201).json(
      new apiResponse(
        201,
        {
          alumni:{
              alumnis,totalAlumni
          }
        },
        "Alumni found sucessfully"
      )
    );

})

export const deleteAlumni = asyncHandler(async(req,res,next)=>{
  if(!req.user.isAdmin && req.user._id.toString() !== req.params.userId){
    throw new apiError(403 , "Oops !! Sorry but you are not allowed")
}


const alumni = await Alumni.findByIdAndDelete(req.params.alumniId);
if (!alumni) {
    throw new apiError(404, "Hey !! I think these alumni profile is already deleted");
  }
  res.status(200).json({
    message: "Sad!! to see that number of Alumni decreased",
  });
})


export const editAlumni = asyncHandler(async(req,res,next)=>{
  if (!req.user.isAdmin && req.user._id.toString() !== req.params.userId){
    throw new apiError(403 , "Oops !! Sorry but you are not allowed")
}

const alumni = await Alumni.findByIdAndUpdate(
  req.params.alumniId,
  {
    $set:{
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      email:req.body.email,
      about:req.body.about,
      batch:req.body.batch,
      image:req.body.image,
      instagram:req.body.instagram,
      branch:req.body.branch,
      linkedin:req.body.linkedin,
      company:req.body.company,
      slug: `${req.body.firstname.toLowerCase().split(" ").join("-")}-${Date.now()}-${req.body.lastname.toLowerCase()}`
     }
  },
  {
    new:true
  }
);

if (!alumni) {
  throw new apiError(404, "Hey !! I think these alumni details is already updated");
}

try{
const UpdatedAlumni = await Alumni.findById( req.params.alumniId).select("-__v");
if (!UpdatedAlumni) {
  throw new apiError(500, "Alumni not updated");
}

const options = {
  httpOnly: true,
  secure: true,
};
return res.status(201).json(
  new apiResponse(
    201,
    {
      alumni: UpdatedAlumni,
    },
    "Alumni updated successfully"
  )
)
  }
  catch (error) {
      next(error);
    };
})