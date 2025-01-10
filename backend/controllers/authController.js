import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "ncircle"; // Replace with your actual secret

// Signup
export const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          {
            id: user._id,
          },
          "ncircle",
          {
            expiresIn: "1h",
          }
        );

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

        return res.status(200).json({ message: "Login successful", token });
      } else {
        return res.status(401).json({ message: "Invalid Credentials!" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Logout
export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ message: "Logged out successfully." });
};

// Get details of User
export const getdetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (user) {
      res.status(200).json({ email: user.email });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
