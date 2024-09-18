const express = require('express');
const { register, login, getUsersByRole, updateFCMToken } = require('../controllers/userController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/role/:role', getUsersByRole);
router.post('/update-fcm-token', updateFCMToken);


module.exports = router;
