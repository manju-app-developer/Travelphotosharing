import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";

dotenv.config();
const router = express.Router();

// User Signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.createUser(username, email, hashedPassword);

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
