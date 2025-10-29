const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Submission = require('../models/submission');

// Get all users for leaderboard with their stats
router.get('/', async (req, res) => {
  try {
    // Your existing code here...
    const users = await User.aggregate([
      // ... your aggregation pipeline
    ]);

    res.json({
      success: true,
      users: usersWithRank
    });

  } catch (error) {
    console.error('Error fetching users for leaderboard:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching leaderboard data'
    });
  }
});

// Alternative simpler approach
router.get('/simple', async (req, res) => {
  try {
    // Your existing simple version code here...
    const users = await User.find()
      .select('firstName emailId problemSolved createdAt')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      users: usersWithStats
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users data'
    });
  }
});

module.exports = router;