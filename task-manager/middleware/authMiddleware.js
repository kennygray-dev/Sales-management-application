import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  // Check if Authorization header exists and is properly formatted
  const authHeader = req.header("Authorization");
  const tokenFromCookie = req.cookies.token; // Optional: Check for token in cookies

  // Extract token from header or cookie
  const token = authHeader?.split(" ")[1] || tokenFromCookie;

  if (!token) {
    return res.status(401).json({ error: "Access Denied: No Token Provided" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from database and attach to request object
    const user = await User.findById(decoded.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user; // Attach user object to request

    // Proceed to next middleware or controller
    next();
  } catch (error) {
    // Log error for debugging (in development mode)
    if (process.env.NODE_ENV === "development") {
      console.error("JWT Verification Error:", error.message);
    }

    // Send appropriate error response
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Session Expired. Please log in again." });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid Token" });
    } else {
      return res.status(401).json({ error: "Authentication Failed" });
    }
  }
};

export default authMiddleware;