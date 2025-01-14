import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Switch, FormControlLabel } from "@mui/material";
import GridLayout from "react-grid-layout";
import WeatherWidget from "../../Widgets/WeatherWidget";
import TaskWidget from "../../widgets/TaskWidget";
import NoteWidget from "../../widgets/NoteWidget";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    weather: false,
    task: false,
    note: false,
  });

  const [layout, setLayout] = useState([]);
  const [draggable, setDraggable] = useState(true);

  // Function to fetch widgets available
  const fetchWidgets = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/dashboard/get",
        {},
        { withCredentials: true }
      );
      setDashboard(response.data);

      // Initialize layout based on fetched data
      const initialLayout = [];
      if (response.data.weather)
        initialLayout.push({ i: "weather", x: 0, y: 0, w: 10, h: 2 });
      if (response.data.task)
        initialLayout.push({ i: "task", x: 10, y: 0, w: 10, h: 2 });
      if (response.data.note)
        initialLayout.push({ i: "note", x: 8, y: 0, w: 10, h: 2 });

      setLayout(initialLayout);
    } catch (error) {
      console.error("Error Getting Dashboard data", error);
    }
  };

  useEffect(() => {
    fetchWidgets();
  }, []);

  // Save the layout when it changes
  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
    console.log("New Layout:", newLayout);
  };

  // Render the correct widget based on type
  const renderWidget = (type) => {
    switch (type) {
      case "weather":
        return <WeatherWidget />;
      case "task":
        return <TaskWidget />;
      case "note":
        return <NoteWidget />;
      default:
        return null;
    }
  };

  const handleDraggableChange = (event) => {
    setDraggable(event.target.checked);
  };

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <div style={{ width: "100%", margin: "auto" }}>
        <Typography variant="h6" gutterBottom>
          Dashboard
        </Typography>
        <FormControlLabel
          control={
            <Switch checked={draggable} onChange={handleDraggableChange} />
          }
          label="Enable Drag"
        />
      </div>

      <GridLayout
        className="layout"
        layout={layout}
        cols={30} // Number of columns in the grid
        rowHeight={50} // Height of each row
        width={"100%"} // Total width of the grid
        onLayoutChange={onLayoutChange} // Callback on layout change
        isDraggable={draggable} // Allow dragging
      >
        {layout.map((widget) => (
          <div key={widget.i}>{renderWidget(widget.i)}</div>
        ))}
      </GridLayout>
    </div>
  );
};

export default Dashboard;
