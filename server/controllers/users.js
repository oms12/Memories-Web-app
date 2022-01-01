import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import dotenv from "dotenv";


const router = express.Router();


dotenv.config();
// secret to be generated be careful
const secret = process.env.auth_secret;

export const signin = async (req,res) =>
{
   const {email , password} = req.body;
   try {
       const existingUser = await User.findOne({email});
       if(!existingUser) return res.status(404).json({message:"User Doesn't exist"});
       const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
       if(!isPasswordCorrect) return res.status(400).json({message: "Invalid Credentials"});
       const token = jwt.sign({email:existingUser.email, id:existingUser._id},secret,{expiresIn : "0.5h"});
       res.status(200).json({result:existingUser, token});
   } catch (error) {
       res.status(500).json({message : "Something went wrong"});
   }
}

export const signup = async(req,res)=>
{
    const {name , email, password, confirmPassword} = req.body;
   try {
       const existingUser = await User.findOne({email});
       if(existingUser) return res.status(202).json({message : "User Already exist"});
       if(confirmPassword !== password) return res.status(400).json({message : "Password not match"}); 
       const hashedPassword = await bcrypt.hash(password,12);
       const result  = await User.create({name: name, email : email , password: hashedPassword});
       const token = jwt.sign({ email: result.email, id: result._id}, secret, { expiresIn: "0.5h" });
       res.status(201).json({result:result, token});
   } catch (error) {
    res.status(500).json({meassge : "Something went wrong"});
   }
}
export default router;