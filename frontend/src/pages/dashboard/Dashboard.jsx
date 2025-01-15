import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Switch, FormControlLabel } from "@mui/material";
import { Responsive, WidthProvider } from "react-grid-layout";
import WeatherWidget from "../../Widgets/WeatherWidget";
import TaskWidget from "../../widgets/TaskWidget";
import NoteWidget from "../../widgets/NoteWidget";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    weather: false,
    task: false,
    note: false,
  });

  const [layout, setLayout] = useState([]);
  const [draggable, setDraggable] = useState(true);

  // Fetch widgets and their layout from the API
  const fetchWidgets = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/dashboard/get",
        {},
        { withCredentials: true }
      );

      const fetchedData = response.data;
      setDashboard(fetchedData);

      const storedLayout = JSON.parse(localStorage.getItem("dashboardLayout"));
      const initialLayout =
        storedLayout?.length == 3
          ? storedLayout
          : initializeLayout(fetchedData);
      setLayout(initialLayout);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  // Initialize layout dynamically based on available widgets
  const initializeLayout = () => {
    const widgets = ["weather", "task", "note"];
    const initialLayout = [];
    let currentColumn = 0;

    widgets.forEach((widget) => {
      initialLayout.push({
        i: widget,
        x: currentColumn % 3,
        y: Math.floor(currentColumn / 3),
        w: 1,
        h: 2,
      });
      currentColumn++;
    });

    return initialLayout;
  };

  // Save layout to the backend and local storage
  const saveLayout = async (newLayout) => {
    try {
      localStorage.setItem("dashboardLayout", JSON.stringify(newLayout));
      await axios.post(
        "http://localhost:3000/api/dashboard/update",
        { layout: newLayout },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error updating dashboard layout:", error);
    }
  };

  useEffect(() => {
    fetchWidgets();
  }, []);

  // Handle layout changes
  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
    saveLayout(newLayout);
    console.log("Updated Layout:", newLayout);
  };

  // Render widgets dynamically
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

  // Toggle draggable state
  const handleDraggableChange = (event) => {
    setDraggable(event.target.checked);
  };

  return (
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
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
        rowHeight={300}
        onLayoutChange={onLayoutChange}
        isDraggable={draggable}
        isResizable={true}
        margin={[10, 10]}
        containerPadding={[10, 10]}
        preventCollision={true}
      >
        {layout.map(
          (widget) =>
            dashboard[widget.i] && (
              <div key={widget.i} data-grid={widget}>
                {renderWidget(widget.i)}
              </div>
            )
        )}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
