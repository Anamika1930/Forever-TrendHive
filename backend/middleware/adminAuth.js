import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  console.log("Auth Middleware Triggered");

  try {
    let token = req.headers.token || req.headers["authorization"];
    console.log("Raw token from headers:", token);

    if (!token) {
      console.log("No token found in headers");
      return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    console.log("Extracted token:", token);
    console.log("JWT_SECRET from env:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // Check if id exists in the token (basic validation for any user)
    if (!decoded.id) {
      console.log("User id missing in token");
      return res.status(401).json({ success: false, message: "Invalid token: user id missing" });
    }

    req.userId = decoded.id; // Save user id for later use
    console.log("Authorization successful for userId:", decoded.id);
    
    next();

  } catch (error) {
    console.log("Error in authMiddleware:", error.message);
    return res.status(401).json({ success: false, message: "Token is invalid or expired" });
  }
};

export default authMiddleware;

