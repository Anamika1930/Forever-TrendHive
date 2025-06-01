import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Token extracted
        if (!token) return res.status(401).json({ success: false, message: "Token missing, please login" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Token decoded
        const user = await userModel.findById(decoded.id); //Fetch user from database

        if (!user) return res.status(401).json({ success: false, message: "User not found, login again" });

        req.user = user; // Authenticated user attached
        req.userId = user._id; // User ID attached (For order)
        next(); // Call next middleware
    } catch (error) {
        console.error("Auth Error:", error);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export default authUser;
