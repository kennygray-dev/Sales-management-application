import Task from "../models/Task.js";

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ dueDate: 1 }); // Sort by due date
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const task = new Task({ user: req.user.id, title, description, dueDate, completed: false });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: "Failed to create task" });
  }
};

// Update task completion status
export const updateTaskCompletion = async (req, res) => {
  try {
    const { completed } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed, completedAt: completed ? new Date() : null },
      { new: true }
    );

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task marked as completed", task });
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

// General task update
export const updateTask = async (req, res) => {
  try {
    const { title, description, completed, dueDate } = req.body;

    if (dueDate && new Date(dueDate) < new Date()) {
      return res.status(400).json({ error: "Due date must be in the future" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, completed, dueDate },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ error: "Task not found" });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // Ensure the task belongs to the user
    });

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};