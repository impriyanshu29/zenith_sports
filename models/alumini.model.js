import mongoose from "mongoose";
const alumniSchema = new mongoose.Schema({
   
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"https://images.app.goo.gl/ET4EH8yBtKazoYZcA"
    },
    about:{
        type:String,
        required:true
    },
    instagram:{
        type:String,
        default:"https://www.instagram.com/"
    },
    linkedin:{
        type:String,
        default:"https://www.instagram.com/"
    },
    slug:{
        type:String,
        
        unique:true,
    },
    batch:{
        type:Number,
        required:true,
    },
    branch:{
        type:String,
        
    },
    company:{
        type:String,
    },
   
    
    email:{
        type:String,
        required:true,
    },
   
},{timestamps:true});
export const Alumni =  mongoose.model("Alumni",alumniSchema);