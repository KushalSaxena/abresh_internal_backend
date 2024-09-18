const Task = require('../models/taskModel');

// Get All Tasks based on role
// Get All Tasks based on role
exports.getAllTasks = async (req, res) => {
  try {
    const userRole = req.user.role; // Extract the role from the authenticated user (from JWT)
    let tasks;

    // If the user is Admin or HR, allow access to all tasks
    if (userRole === 'Admin' || userRole === 'HR') {
      tasks = await Task.find(); // Fetch all tasks for Admin/HR
    } else {
      // For regular users, filter tasks based on their role
      tasks = await Task.find({ role: userRole });
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};


// Add a New Task with role-based access
// Add a New Task with role-based access
exports.addTask = async (req, res) => {
  try {
    const {assignedUsername , title, description, deadline, assignedRole} = req.body;
    const userRole = req.user.role; // Extract user role from JWT
    
    // Only allow specific roles (e.g., Admin, Manager) to add tasks
    const allowedRoles = ['Admin', 'Manager','HR'];
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied. You are not allowed to add tasks.' });
    }

    const newTask = new Task({
      username: assignedUsername, // Assign the task to a specific user
      title,
      description,
      deadline,
      role: assignedRole, // Assign the task to the chosen role
    });

    await newTask.save();
    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};


// Update Task progress based on role
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { progress } = req.body;
    const userRole = req.user.role; // Extract the role from the authenticated user

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if the user is allowed to update this task
    if (task.role !== userRole) {
      return res.status(403).json({ message: 'Access denied. You are not authorized to update this task.' });
    }

    task.progress = progress;
    await task.save();

    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

// Filter tasks based on role, username, or deadline
exports.filterTasks = async (req, res) => {
  try {
    const { role, username, deadline } = req.query;  // Fetch the filter parameters from the query

    let filterCriteria = {};

    // Apply role filter if provided
    if (role) {
      filterCriteria.role = role;
    }

    // Apply username filter if provided
    if (username) {
      filterCriteria.username = username;
    }

    // Apply deadline filter if provided
    if (deadline) {
      filterCriteria.deadline = { $lte: new Date(deadline) };  // Show tasks due by the given deadline
    }

    const tasks = await Task.find(filterCriteria);  // Fetch tasks based on filters

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching filtered tasks', error: error.message });
  }
};


// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userRole = req.user.role; // Extract user role from JWT

    // Only allow specific roles (e.g., Admin, Manager) to delete tasks
    const allowedRoles = ['Admin'];
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied. You are not allowed to delete tasks.' });
    }

    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};
