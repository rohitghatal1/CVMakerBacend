import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { loginUser, registerUser } from '../controllers/AuthController';

const router = express.Router();

router.post("/register", verifyToken, registerUser )
router.post("/login", verifyToken, loginUser);


export default router