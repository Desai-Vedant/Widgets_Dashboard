import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  // get userId from req.user.id
  // get list of tasks for user if not found then send empty list
  try {
    const userId = req.user.id;
    const tasksData = await Task.findOne({ userId });
    if (!tasksData) {
      return res.status(200).json({ tasks: {} });
    } else {
      return res.status(200).json({ tasks: tasksData.tasks });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasksData = req.body;

    // Find the user's tasks
    const taskData = await Task.findOne({ userId });

    if (!taskData) {
      // If no tasks exist, create a new document
      const tasks = await Task.create({ userId, tasks: tasksData });
      return res
        .status(200)
        .json({ message: "Task created successfully", tasks });
    } else {
      // If tasks exist update them
      const updateResult = await Task.updateOne(
        { userId },
        { tasks: tasksData }
      );

      // Check if the update operation was successful
      if (updateResult.modifiedCount > 0) {
        return res.status(200).json({ message: "Task updated successfully" });
      } else {
        return res.status(200).json({ message: "No changes made to the task" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
