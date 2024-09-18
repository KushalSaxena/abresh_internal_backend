const express = require('express');
const router = express.Router();
const { createReimbursement, getReimbursements , updateReimbursementProgress} = require('../controllers/reimbursementController');


// Define routes
router.post('/', createReimbursement);
router.get('/', getReimbursements);
router.put('/:id/progress',updateReimbursementProgress);


module.exports = router;
