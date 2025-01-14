import express from "express";
import { getNotes, updateNotes } from "../controllers/noteController.js";
import authenticateToken from "../utils/authorization.js";

const router = express.Router();

// Get weather data route
router.post("/getdata", authenticateToken, getNotes);

// Update Weather Data route
router.post("/update", authenticateToken, updateNotes);

export default router;
