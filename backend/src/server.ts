import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";

// Load environment variables
dotenv.config();

// Ensure PORT is read correctly
const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Default route to check if the server is working
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
