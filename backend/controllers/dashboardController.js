import Dashboard from "../models/Dashboard.js";

export const addWidget = async (req, res) => {
  try {
    const userId = req.user.id;
    const widget = req.body.widget;
    const dashboard = await Dashboard.findOne({ userId });
    if (!dashboard) {
      const newDashboard = await Dashboard.create({ userId });
      if (!newDashboard) {
        return res.status(500).json({ message: "Failed to create dashboard." });
      }
    }
    if (widget == "weather") {
      dashboard.weather = true;
    } else if (widget == "task") {
      dashboard.task = true;
    } else if (widget == "note") {
      dashboard.note = true;
    }
    const updatedDashboard = await Dashboard.findOneAndUpdate(
      { userId },
      dashboard
    );
    if (!updatedDashboard) {
      res.status(500).json({ message: "Error while Updating the data." });
    }
    res.status(200).json({ message: "Widget Added Sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const removeWidget = async (req, res) => {
  try {
    const userId = req.user.id;
    const widget = req.body.widget;
    const dashboard = await Dashboard.findOne({ userId });
    if (!dashboard) {
      const newDashboard = await Dashboard.create({ userId });
      if (!newDashboard) {
        return res.status(500).json({ message: "Failed to create dashboard." });
      }
    }
    if (widget == "weather") {
      dashboard.weather = false;
    } else if (widget == "task") {
      dashboard.task = false;
    } else if (widget == "note") {
      dashboard.note = false;
    }
    const updatedDashboard = await Dashboard.findOneAndUpdate(
      { userId },
      dashboard
    );
    if (!updatedDashboard) {
      res.status(500).json({ message: "Error while Updating the data." });
    }
    res.status(200).json({ message: "Widget Removed Sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const dashboard = await Dashboard.findOne({ userId });
    if (!dashboard) {
      const newDashboard = await Dashboard.create({ userId });
      if (!newDashboard) {
        return res.status(500).json({ message: "Failed to create dashboard." });
      }
    }
    res.status(200).json(dashboard);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error.", error });
  }
};
