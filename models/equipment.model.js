import express from 'express';
import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const equipmentSchema = new Schema({
    equipName :{
        type :String,
        required : true
    },
    equipDescription :{
        type :String,
        required : true
    },
    equipPrice :{
        type :Number,
        required : true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    },
    equipImage :{
        type :String, 
        required : true
    },
    equipCategory :{
        type :String,
       
        required : true
    },
    equipType :{
        type :String,
        required : true
    },
   
    equipRating :{
        type :Number,
    },
    equipDiscount :{
        type :Number,
    },
    discountPrice :{
        type :Number,
    },
    equipStatus :{
        type :String,
        default : "In Stock "
    },
    isWhistListed:{
        type:Boolean,
        default:false
    }
    
},{ timestamps: true });

const Equip= mongoose.model('Equip',equipmentSchema);
export default Equip;