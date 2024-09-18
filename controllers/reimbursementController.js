const Reimbursement = require('../models/reimbursementModel');

// API to submit a reimbursement request
exports.createReimbursement = async (req, res) => {
  try {
    const { employeeName, details, amount, progress } = req.body;
    // const proof = req.file ? req.file.path : null; // File upload for proof

    // if (!proof) {
    //   return res.status(400).json({ message: 'Proof is required' });
    // }

    const reimbursement = new Reimbursement({
      employeeName,
      details,
      amount,
     // proof,
      progress: progress || 'Pending', // Default progress is "Pending"
    });

    await reimbursement.save();
    res.status(201).json({ message: 'Reimbursement submitted successfully', reimbursement });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getReimbursements = async (req, res) => {
    try {
      const reimbursements = await Reimbursement.find();
      res.status(200).json(reimbursements);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reimbursements', error: error.message });
    }
  };
  
  exports.updateReimbursementProgress = async (req, res) => {
    try { 
      const { id } = req.params;
      const { progress } = req.body;
  
      const updatedReimbursement = await Reimbursement.findByIdAndUpdate(
        id,
        { progress },
        { new: true }
      );
  
      if (!updatedReimbursement) {
        return res.status(404).json({ message: 'Reimbursement not found' });
      }
  
      res.status(200).json({ message: 'Reimbursement status updated', updatedReimbursement });
    } catch (error) {
      res.status(400).json({ message: 'Error updating reimbursement status', error: error.message });
    }
  };