import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { List, ListItem, ListItemText, Checkbox } from "@mui/material";
import axios from "axios";

function TaskWidget() {
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to get tasks data from database
  const getTasksData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/task/getdata",
        {},
        { withCredentials: true }
      );
      setTasks(response.data.tasks || {});
      console.log(response.data.tasks);
    } catch (error) {
      setError("Failed to Get Tasks List");
      console.error("Failed to Get Tasks List", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to Update task data on database
  const updateTasksData = async (tasksData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/task/update",
        tasksData,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      setError("Failed to update the backend");
      console.error("Failed to update the backend:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(`Tasks Data Update Use Effect 1 : ${JSON.stringify(tasks)}`);
    const taskData = tasks;
    updateTasksData(taskData);
    console.log(`Tasks Data Update Use Effect 2 : ${JSON.stringify(tasks)}`);
  }, [tasks]);

  useEffect(() => {
    console.log(`Tasks Data Get Use Effect 3 : ${JSON.stringify(tasks)}`);
    getTasksData();
    console.log(`Tasks Data Get Use Effect 4 : ${JSON.stringify(tasks)}`);
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
      sx={{
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        maxWidth: 400,
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" component="div" sx={{ p: 2 }}>
        Task Manager
      </Typography>
      <Box sx={{ p: 2 }}>
        <TextField
          id="new-task"
          label="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          sx={{ width: "100%" }}
        />
        <Button
          variant="contained"
          onClick={handleAddTask}
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Task"}
        </Button>
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </Box>
      <List>
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
