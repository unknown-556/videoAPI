import express from "express";
const router = express.Router()
import { signUp, signIn } from "../controllers/userControllers.js";
import upload from "../config/register.js";



router.post("/register", upload.single('image'), signUp)
router.post('/login', signIn)

export default router;