const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key'; // Replace with a strong secret key for JWT

exports.register = async (req, res) => {
  try {
    const { username, password, role , designation} = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already registered' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashPassword, role, designation });
    await user.save();

    const token = jwt.sign({ username: user.username, role: user.role, designation: user.designation }, SECRET_KEY, { expiresIn: '1h' });

    // Send response with the token
    res.status(200).json({ token: token, role: user.role, designation: user.designation });
    } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password} = req.body; // Capture FCM token from request

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

    
    const token = jwt.sign({ username: user.username, role: user.role, desgination: user.designation }, SECRET_KEY, { expiresIn: '3d' });

    // Send response with the token and userId
    res.status(200).json({ 
      token: token, 
      role: user.role, 
      desgination : user.designation
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params; // Get role from request parameters

    // Fetch users based on the role
    const users = await User.find({ role });

    if (!users.length) {
      return res.status(404).json({ message: 'No users found for this role' });
    }

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Update FCM token for a specific user
exports.updateFCMToken = async (req, res) => {
  try {
    const { userId, fcmToken } = req.body; // Get userId and fcmToken from request body

    if (!userId || !fcmToken) {
      return res.status(400).json({ message: 'UserId and FCM token are required' });
    }

    // Find user by userId and update their FCM token
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.fcmToken = fcmToken; // Update the user's FCM token
    await user.save(); // Save the updated user document

    res.status(200).json({ message: 'FCM token updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating FCM token', error: error.message });
  }
};
