import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import User from '../models/User.js';

/*register user*/
export const register =async(req,res)=>{
    try{
        const{
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        }=req.body;
        const salt=await bcrypt.genSalt();
        const passwordHash=await bcrypt.hash(password,salt);
        const newUser=new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile:Math.floor(Math.random()*1000),
            impressions:Math.floor(Math.random()*1000)
        })
        const savedUser= await new newUser.save();
        res.status(201).json(savedUser) 
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

/* logging in*/

export const login=async (req,res)=>{
    try{
        const {email,password} = req.body
        const userToCheck=await User.findOne({email:email});
        if(!userToCheck){
            return res.status(400).json({msg: "User does not exist"})
        }
        const isMatch= await bcrypt.compare(password,userToCheck.password)
        if(isMatch!==true){
            return res.status(400).json({msg: "User password incorrect"});
        }
        const token=jwt.sign({id:userToCheck._id},process.env.JWT_SECRET)
        delete userToCheck.password
        res.status(200).json({token,userToCheck})
    }catch(err){
        res.status(500).json({error:err.message})  
    }
}