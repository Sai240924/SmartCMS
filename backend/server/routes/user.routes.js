const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const authMiddleware = require('../middleware/auth.middleware');

// Apply authentication and admin middleware
router.use(authMiddleware.verifyToken);

// Get all users (admin only)
router.get('/', async (req, res) => {
  try {
    // Check if user is admin
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user by ID (admin only or own profile)
router.get('/:id', async (req, res) => {
  try {
    // Check if user is admin or requesting own profile
    if (req.userRole !== 'admin' && req.userId !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user (admin only or own profile)
router.put('/:id', async (req, res) => {
  try {
    // Check if user is admin or updating own profile
    if (req.userRole !== 'admin' && req.userId !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { name, email, role } = req.body;
    
    // Only admin can update role
    const updateData = { name, email };
    if (req.userRole === 'admin' && role) {
      updateData.role = role;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;