const Complaint = require('../models/complaint.model');

// Create a new complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;
    
    const complaint = new Complaint({
      title,
      description,
      category,
      priority,
      userId: req.userId
    });

    await complaint.save();
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const { status, category, priority, search } = req.query;
    const query = {};

    // Add filters if provided
    if (status) query.status = status;
    if (category) query.category = category;
    if (priority) query.priority = priority;
    
    // Add search if provided
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // If user role is 'user', only show their complaints
    if (req.userRole === 'user') {
      query.userId = req.userId;
    }

    const complaints = await Complaint.find(query)
      .populate('userId', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
      
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get complaint by ID
exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('assignedTo', 'name email')
      .populate('comments.userId', 'name email');
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // If user role is 'user', only allow them to view their own complaints
    if (req.userRole === 'user' && complaint.userId._id.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update complaint
exports.updateComplaint = async (req, res) => {
  try {
    const { title, description, category, priority, status, assignedTo } = req.body;
    
    // Find the complaint
    const complaint = await Complaint.findById(req.params.id);
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Check permissions
    if (req.userRole === 'user' && complaint.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update fields
    if (title) complaint.title = title;
    if (description) complaint.description = description;
    if (category) complaint.category = category;
    if (priority) complaint.priority = priority;
    
    // Only admin can update status and assignedTo
    if (req.userRole === 'admin') {
      if (status) {
        complaint.status = status;
        if (status === 'Resolved') {
          complaint.resolvedAt = Date.now();
        }
      }
      if (assignedTo) complaint.assignedTo = assignedTo;
    }

    complaint.updatedAt = Date.now();
    await complaint.save();
    
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add comment to complaint
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    
    const complaint = await Complaint.findById(req.params.id);
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Add comment
    complaint.comments.push({
      text,
      userId: req.userId
    });

    complaint.updatedAt = Date.now();
    await complaint.save();
    
    // Populate the newly added comment's user info
    const updatedComplaint = await Complaint.findById(req.params.id)
      .populate('comments.userId', 'name email');
    
    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete complaint
exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Only admin or the creator can delete
    if (req.userRole !== 'admin' && complaint.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Complaint.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get complaint statistics (for admin dashboard)
exports.getStatistics = async (req, res) => {
  try {
    // Only allow admins to access statistics
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const totalComplaints = await Complaint.countDocuments();
    const newComplaints = await Complaint.countDocuments({ status: 'New' });
    const inProgressComplaints = await Complaint.countDocuments({ status: 'In Progress' });
    const resolvedComplaints = await Complaint.countDocuments({ status: 'Resolved' });
    
    const categoryStats = await Complaint.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    const priorityStats = await Complaint.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    // Get recent complaints
    const recentComplaints = await Complaint.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'name');

    res.status(200).json({
      totalComplaints,
      newComplaints,
      inProgressComplaints,
      resolvedComplaints,
      categoryStats,
      priorityStats,
      recentComplaints
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};