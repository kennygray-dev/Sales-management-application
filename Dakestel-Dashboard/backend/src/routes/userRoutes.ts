// routes/userRoutes.ts
import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/userController";
import { protect } from "../middleware/authMiddleware"; // Import the middleware

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile); // Use the middleware here

export default router;