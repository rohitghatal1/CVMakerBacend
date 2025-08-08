import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { registerUser } from '../controllers/AuthController';

const router = express.Router();

router.post("/register", verifyToken, registerUser )



export default router