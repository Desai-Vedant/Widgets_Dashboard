import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { List, ListItem, ListItemText, Checkbox } from "@mui/material";
import axios from "axios";

function TaskWidget() {
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [syncStatus, setSyncStatus] = useState("synced");

  // Function to get tasks data from database
  const getTasksData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        "http://localhost:3000/api/task/getdata",
        {},
        { withCredentials: true }
      );
      setTasks(response.data.tasks || {});
      setSyncStatus("synced");
    } catch (error) {
      setError("Failed to Get Tasks List");
      console.error("Failed to Get Tasks List", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to Update task data on database with retry logic
  const updateTasksData = async (tasksData) => {
    try {
      setLoading(true);
      setError(null);
      setSyncStatus("syncing");
      const response = await axios.post(
        "http://localhost:3000/api/task/update",
        tasksData,
        {
          withCredentials: true,
        }
      );
      setSyncStatus("synced");
    } catch (error) {
      setSyncStatus("failed");
      setError("Failed to save changes. Will retry automatically.");
      console.error("Failed to update the backend:", error);
      // Retry after 5 seconds
      setTimeout(() => {
        if (syncStatus === "failed") {
          updateTasksData(tasksData);
        }
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  // Debounce updates to prevent too frequent API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (Object.keys(tasks).length > 0) {
        updateTasksData(tasks);
      }
    }, 1000); // Wait 1 second after last change before updating

    return () => clearTimeout(timeoutId);
  }, [tasks]);

  useEffect(() => {
    getTasksData();
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks({ ...tasks, [newTask]: false });
      setNewTask("");
    }
  };

  const handleDeleteTask = (taskName) => {
    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };
      delete newTasks[taskName];
      return newTasks;
    });
  };

  const handleToggleTask = (taskName) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [taskName]: !prevTasks[taskName],
    }));
  };

  return (
    <Box
      id="task"
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        margin: "auto",
        width: "100%",
        height: "100%",
        textAlign: "center",
        minHeight: 300,
      }}
    >
      <Typography variant="h6" component="div" sx={{ p: 1, height: 50 }}>
        Task Manager
      </Typography>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <TextField
          id="new-task"
          label="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          sx={{ width: "100%" }}
          error={!!error}
          helperText={error}
        />
        <Button variant="contained" onClick={handleAddTask} disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </Button>
      </Box>
      <List
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: 0,
          marginTop: 2,
          scrollbarWidth: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: "4px",
          },
        }}
      >
        {Object.keys(tasks).map((taskName) => (
          <ListItem
            key={taskName}
            secondaryAction={
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteTask(taskName)}
                disabled={loading}
              >
                Delete
              </Button>
            }
          >
            <Checkbox
              checked={tasks[taskName]}
              onChange={() => handleToggleTask(taskName)}
            />
            <ListItemText primary={taskName} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default TaskWidget;
