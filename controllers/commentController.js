// controllers/commentController.js
const Comment = require('../models/commentModel');
const User = require('../models/userModel');



// Post comment and send notification
exports.postComment = async (req, res) => {
  try {
    const { name, comment, targetRoles, userId } = req.body; // Include userId to identify the recipient

    // Ensure targetRoles is provided and valid
    if (!targetRoles || !Array.isArray(targetRoles)) {
      return res.status(400).json({ error: 'targetRoles must be an array of roles' });
    }

    // Create the new comment
    const newComment = new Comment({
      name,
      comment,
      role: req.user.role, // Assign the role of the logged-in user (e.g., 'Admin', 'HR')
      targetRoles, // Specify which roles should see this comment
    });

    await newComment.save();

    // Find the user the comment is meant for by userId
  

    res.status(201).json({
      message: 'Comment posted successfully',
      comment: newComment,
    });
  } catch (error) {
    console.error('Error while posting comment or sending notification:', error);
    res.status(500).json({ error: 'Failed to post comment or send notification' });
  }
};

// GET: To retrieve comments based on user's role
exports.getComments = async (req, res) => {
  try {
    const userRole = req.user.role; // Get the logged-in user's role

    // Fetch comments where the user's role is in the targetRoles array
    const comments = await Comment.find({
      targetRoles: userRole
    });

    res.json(comments);
  } catch (error) {
    console.error('Error while fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};
