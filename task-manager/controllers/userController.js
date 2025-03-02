import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { compare } from "bcryptjs";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Normalize the email
    const normalizedEmail = email.trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("password", password)

    // Create new user
    const newUser = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Normalize the email
    const normalizedEmail = email.trim();

    // Find user
    const user = await User.findOne({ email: normalizedEmail });
    console.log("in")
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await compare(password, user.password);
    console.log("out", user)
    console.log("out1", password)
    if (!isMatch) 
      {
        console.log("new")
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Set token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
    });

    // Return token and user data (excluding password)
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};