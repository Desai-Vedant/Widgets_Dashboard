import express from "express";
import { getTasks, updateTasks } from "../controllers/taskController.js";
import authenticateToken from "../utils/authorization.js";

const router = express.Router();

// Get weather data route
router.post("/getdata", authenticateToken, getTasks);

// Update Weather Data route
router.post("/update", authenticateToken, updateTasks);

export default router;
