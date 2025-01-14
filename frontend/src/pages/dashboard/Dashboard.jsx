import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WeatherWidget from "../../Widgets/WeatherWidget";
import TaskWidget from "../../widgets/TaskWidget";
import NoteWidget from "../../widgets/NoteWidget";

const Dashboard = () => {
  // State to store dashboard
  const [dashboard, setDashboard] = useState({
    weather: false,
    task: false,
    note: false,
  });

  // Function to fetch widgets available
  const fetchWidgets = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/dashboard/get",
        {},
        { withCredentials: true }
      );

      setDashboard(response.data);
    } catch (error) {
      console.error("Error Getting Dashboard data", error);
    }
  };

  // Use effect that runs fetch widgets
  useEffect(() => {
    fetchWidgets();
  }, []);

  // condition based widget loading
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {dashboard.weather && <WeatherWidget />}
      {dashboard.task && <TaskWidget />}
      {dashboard.note && <NoteWidget />}
    </Box>
  );
};

export default Dashboard;
