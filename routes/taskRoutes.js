const express = require('express');
const { getAllTasks, addTask, updateTask, filterTasks, deleteTask } = require('../controllers/taskController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.get('/',authenticateToken, getAllTasks);
router.post('/',authenticateToken, addTask);
router.put('/:taskId',authenticateToken, updateTask);
router.delete('/:taskId',authenticateToken, deleteTask);
router.get('/filter', filterTasks);


module.exports = router;
