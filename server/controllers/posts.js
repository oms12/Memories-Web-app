import Postmessage from "../models/postMessage.js";
import express from "express";

const router = express.Router();

export const getPosts = async (req,res)=>
{
   try {
      const Postmessages = await Postmessage.find({userId : req.userId});
      res.status(200).json(Postmessages);
   } catch (error) {
      res.status(404).json({message: error.message});
   }

}
export const createPost = async (req,res)=>
{
   const post = {
      title : req.body.title,
      message : req.body.message,
      userId : req.userId,
      tags : req.body.tags,
      selectedFile : req.body.selectedFile,
      createdAt : req.body.createdAt

   }
   console.log("ok added");
   const newPost = new Postmessage(post);
   try {
      await newPost.save();
      res.status(201).json("added");
   } catch (error) {
      res.status(409).json({message : error.message});
   }
}
export const deletePost = async (req,res)=>
{
    try {
       await Postmessage.findByIdAndDelete(req.params.id);
       res.json("deleted");
    } catch (error) {
       console.log(error);
    }
}
export const updatePost = async (req,res) =>
{
   try {
     //console.log(req.params.id);
     var post =  await Postmessage.findById(req.params.id);
     post.title = req.body.title;
     post.message = req.body.message;
     post.tags = req.body.tags;
     post.selectedFile = req.body.selectedFile;
     await post.save();
     res.json("updated");
   } catch (error) {
      console.log(error);
   }
} 
export default router;