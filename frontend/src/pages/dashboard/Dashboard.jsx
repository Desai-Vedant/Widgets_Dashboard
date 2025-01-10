import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WeatherWidget from "../../components/WeatherWidget";

const Dashboard = () => {
  const [widgets, setWidgets] = useState([]);

  const handleAddWidget = (widgetData) => {
    setWidgets((prev) => [...prev, widgetData]);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <WeatherWidget onAddToDashboard={handleAddWidget} />
      <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
        {widgets.map((widget, index) => (
          <Box
            key={index}
            sx={{
              border: "1px solid",
              borderColor: "grey.400",
              borderRadius: 2,
              p: 2,
              m: 1,
              minWidth: 200,
            }}
          >
            <Typography variant="body1">
              <strong>City:</strong> {widget.name}
            </Typography>
            <Typography variant="body1">
              <strong>Temperature:</strong> {widget.main.temp}°C
            </Typography>
            <Typography variant="body1">
              <strong>Condition:</strong> {widget.weather[0].description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
