const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true, // e.g., 'Admin', 'HR'
    enum: ['Admin', 'HR'], // Extend this list with other roles if needed
  },
  targetRoles: {
    type: [String],  // Array of roles the comment should be visible to
    required: true,
    enum: ['Admin', 'HR', 'IT', 'Sales', 'Marketing', 'Accounts', 'Procurement', 'Operation'], // The roles the comment is meant for
  },
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
