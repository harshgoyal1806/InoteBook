const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const MY_SECRET = process.env.JWT_SECRET;
const redisClient = require("../config/redisClient");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please login with correct credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const payload = { user: user._id };
    const token = jwt.sign(payload, MY_SECRET, { expiresIn: "1h" });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: "Server error: please try again" });
  }
}
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData = {
      ...req.body,
      password: hashedPassword,
    };

    const user = new User(userData);
    await user.save();

    // Generate JWT
    const payload = { user: user._id };
    const token = jwt.sign(payload, MY_SECRET, { expiresIn: "1h" });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "Lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res
      .status(201)
      .json({ message: "User created successfully", userId: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ error: "No token found" });
    }

    const payload = jwt.verify(token, MY_SECRET);
    const exp = payload.exp;

    // Block token in Redis until it expires
    await redisClient.set(`token:${token}`, "blocked");
    await redisClient.expireAt(`token:${token}`, exp);

    res.clearCookie("token");

    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
};
const getUser = async (req, res) => {
  try {
    const userId = req.user; 
    const userData = await User.findById(userId).select("-password");
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user: userData });
  } catch (error) {
    res.status(500).json({ error: "Server error: please try again" });
  }
};
module.exports = { login, signup, logout,getUser };
