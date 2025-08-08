import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post("/register", verifyToken, )



export default router