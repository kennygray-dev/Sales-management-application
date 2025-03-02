import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskCompletion,
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply authMiddleware to all routes
router.use(authMiddleware);

// Fetch all tasks for the authenticated user
router.get("/", getTasks);

// Create a new task
router.post("/", createTask);

// Update a task (full update)
router.put("/:id", updateTask);

// Mark a task as complete (partial update)
router.patch("/:id/complete", updateTaskCompletion); // ✅ Use PATCH for partial updates

// Delete a task
router.delete("/:id", deleteTask);

export default router;