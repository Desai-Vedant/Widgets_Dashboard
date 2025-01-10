import express from "express";
import {
  signup,
  login,
  getdetails,
  logout,
} from "../controllers/authController.js";
import authenticateToken from "../utils/authorization.js";

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// Get Details route
router.post("/getdetails", authenticateToken, getdetails);

// Logout route
router.post("/logout", logout);

export default router;
