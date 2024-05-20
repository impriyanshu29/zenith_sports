import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import apiError from '../utils/apiError.js'

export const verifyJWT = asyncHandler(async(req,_,next)=>{
    try{
        const token =  req.cookies?.acessToken|| req.header("Authorization")?.replace("Bearer ","")
        
        
        if(!token){
            throw new apiError(401,"token not found Unauthorized acess")
            
        }
        
        const decodedToken = await jwt.verify(token,process.env.ACESS_TOKEN_SECRET)
        
        
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
         
         
        if(!user){
            throw new apiError(401," USer not found Unauthorized acess")
        }

        req.user = user;
        next()
    }catch(error){
        
        throw new apiError(401,error?.message||"Not authorized, token failed")
    }
});
