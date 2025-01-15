import express from "express";
import {
  addWidget,
  removeWidget,
  getDashboard,
  updateLayout,
} from "../controllers/dashboardController.js";
import authenticateToken from "../utils/authorization.js";

const router = express.Router();

// Add Widget
router.post("/add", authenticateToken, addWidget);

// remove widget
router.post("/remove", authenticateToken, removeWidget);

// get widget
router.post("/get", authenticateToken, getDashboard);

// Update Layout
router.post("/update", authenticateToken, updateLayout);
export default router;
