import express from "express";
import { updateWeather, getWeather } from "../controllers/weatherController.js";
import authenticateToken from "../utils/authorization.js";

const router = express.Router();

// Get weather data route
router.post("/getdata", authenticateToken, getWeather);

// Update Weather Data route
router.post("/update", authenticateToken, updateWeather);

export default router;
