import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User"; // your mongoose model
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "changeme"; // keep secure in env

// REGISTER USER
export const registerUser = async (req: any, res: any) => {
  try {
    const { username, email, password } = req.body;

    // Validate fields
    if (!username || !email || !password) {
      return res.status(400).json({ status: "failed", message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ status: "failed", message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Create JWT
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
        token,
      },
    });
  } catch (err: any) {
    console.error("Register error:", err);
    res.status(500).json({ status: "failed", message: "Server error" });
  }
};

// LOGIN USER
export const loginUser = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({ status: "failed", message: "Email and password required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: "failed", message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: "failed", message: "Invalid credentials" });
    }

    // Create JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        token,
      },
    });
  } catch (err: any) {
    console.error("Login error:", err);
    res.status(500).json({ status: "failed", message: "Server error" });
  }
};
