import express from 'express'
import { createPost } from "../controllers/postController.js";
import auth from "../middleware/auth.js";
import upload from "../config/multer.js";
const router = express.Router()


router.post("/post", auth, upload.single('video'), createPost)


export default router