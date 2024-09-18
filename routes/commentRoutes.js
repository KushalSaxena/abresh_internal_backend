// routes/comments.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const authorizeRole = require('../middleware/authorizeRole');
const commentController = require('../controllers/commentController');

// POST: Only 'admin' and 'hr' can post comments
router.post('/', authenticateToken, authorizeRole(['Admin', 'HR']), commentController.postComment);

// GET: Return only comments for the specific role of the user
router.get('/', authenticateToken, commentController.getComments);

module.exports = router;
