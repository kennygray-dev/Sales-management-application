import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔓 Public routes (No authMiddleware needed)
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔒 Protected routes (Require authentication)
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Profile Data", user: req.user });
});

// Add the /auth/status route
router.get("/auth/status", authMiddleware, (req, res) => {
  res.json({ isAuthenticated: true, user: req.user });
});

export default router;