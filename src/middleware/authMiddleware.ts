import jwt from "jsonwebtoken";
import User from "../models/User";

export const verifyToken = (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ satus: "failed", message: "No token Provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.Admin_JWT_SECRET) {
      throw new Error("No secret key provided in env");
    }

    const decoded = jwt.verify(token, process.env.Admin_JWT_SECRET!) as {
      id: string;
      _id: string;
    };

    const admin = User.findById(decoded.id || decoded._id);

    if (!admin) {
      res.satus(404).json({ status: "failed", message: "Admin not found" });

      req.admin = admin;
      next();
    }
  } catch (err: any) {
    res.status(401).json({ status: "failed", message: "Invalid token" });
  }
};
