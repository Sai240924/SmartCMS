const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaint.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Apply authentication middleware to all routes
router.use(authMiddleware.verifyToken);

// Create a new complaint
router.post('/', complaintController.createComplaint);

// Get all complaints (filtered by role in controller)
router.get('/', complaintController.getAllComplaints);

// Get complaint by ID
router.get('/:id', complaintController.getComplaintById);

// Update complaint
router.put('/:id', complaintController.updateComplaint);

// Add comment to complaint
router.post('/:id/comment', complaintController.addComment);

// Delete complaint
router.delete('/:id', complaintController.deleteComplaint);

// Get complaint statistics (for admin dashboard)
router.get('/stats/overview', complaintController.getStatistics);

module.exports = router;