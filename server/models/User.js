import mongoose from "mongoose";
const userSchema=new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            min:2,
            max:50
        },
        lastName:{
            type:String,
            required:true,
            min:2,
            max:50
        },
        email:{
            type: String,
            max:50,
            required:true,
            unique:true
        },
        password:{
            type: String,
            min:8,
            required:true,
            unique:true
        },
        picturePath:{
            type:String,
            default:""
        },
        friends:{
            type:Array,
            default:[]
        }, 
        location:String,
        occupation:String,
        viewedProfile:Number,
        impressions:Number
    },
    {timestamps:true}
)

const User=mongoose.model("User",userSchema)

export default User