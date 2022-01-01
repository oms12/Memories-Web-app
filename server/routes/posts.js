import express from "express";
import { getPosts, createPost, deletePost,updatePost } from "../controllers/posts.js";
import auth from "../Middleware/auth.js";


const router = express.Router();
router.get("/", auth, getPosts);
router.post("/add", auth, createPost );
router.delete("/:id",auth,deletePost);
router.post("/update/:id",auth, updatePost);
export default router;