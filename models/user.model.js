import mongoose,{Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        
    },
    password:{
        type:String,
         required:[true, "Please enter a password..."],
        
    },
    refreshToken:{
        type:String,
    },
    coverImage:{
        type:String,
        default:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F10%2F05%2F22%2F37%2Fblank-profile-picture-973460_960_720.png&tbnid=GonJG9aLPTc5LM&vet=12ahUKEwjX3oiK1Y6EAxU9pWMGHSxoAsEQMygAegQIARBu..i&imgrefurl=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&docid=wg0CyFWNfK7o5M&w=720&h=720&q=profile&ved=2ahUKEwjX3oiK1Y6EAxU9pWMGHSxoAsEQMygAegQIARBu"
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
},{timestamps:true});


userSchema.pre("save" , async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    else{
        next();
    }
})

userSchema.methods.isPasswordMatch = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAcessToken = async function(){
        return jwt.sign({
            _id:this._id,
            email:this.email,
            username:this.username,
        },process.env.ACESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACESS_TOKEN_SECRET_EXPIRE,
        },
        )
}

userSchema.methods.generateRefreshToken = async function (){
        return jwt.sign(
            {
                _id:this._id,
                isAdmin:this.isAdmin,
                isVerified:this.isVerified,
            },process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:process.env.REFRESH_TOKEN_SECRET_EXPIRE,
            }
        )
}
export const User = mongoose.model("User", userSchema)