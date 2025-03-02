import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

// Load environment variables
dotenv.config();

// Check for required environment variables
const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(` Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Connect to MongoDB
connectDB();

const app = express();

// Rate limiting
const limiter = process.env.NODE_ENV === "production"
  ? rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })
  : (req, res, next) => next();

app.use(limiter);

// Middleware
app.use(express.json()); // Parse JSON
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies and credentials
  })
);

// Helmet configuration
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "same-site" }, // Allow cross-origin requests
  })
);

app.use(morgan("dev")); // Logging

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Root route
app.get("/", (req, res) => {
  res.send("Task Manager API is running...");
});

// Error Handling Middleware
app.use(errorHandler);

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));