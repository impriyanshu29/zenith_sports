import mongoose from "mongoose";
const achievmentSchema = new mongoose.Schema({
    year:{
        type:Number,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    direction:{
        type:String,
        required:true,
    }
   
},{timestamps:true});

export const Achievment =  mongoose.model("Achievment",achievmentSchema);
