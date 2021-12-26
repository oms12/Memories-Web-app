import express from "express";
import { getPosts, createPost, deletePost,updatePost } from "../controllers/posts.js";
const router = express.Router();
router.get("/", getPosts);
router.post("/add",createPost );
router.delete("/:id",deletePost);
router.post("/update/:id",updatePost);
export default router;