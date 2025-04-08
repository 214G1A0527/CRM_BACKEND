const User = require('../models/User');
const Lead = require('../models/Lead');
const mongoose = require('mongoose');

const getDashboardData = async (req, res) => {
  try {
    const totalTelecallers = await User.countDocuments({ role: 'telecaller' });
    const totalCalls = await Lead.countDocuments();
    const totalConnected = await Lead.countDocuments({ 'status.connected': true });

    // Get call trends for the last 7 days
    const callTrends = await Lead.aggregate([
      {
        $match: {
          updatedAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 7))
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' }
          },
          calls: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Connected call records
    const connectedCalls = await Lead.find({ 'status.connected': true })
      .populate('telecaller', 'name email')
      .sort({ updatedAt: -1 });

    res.status(200).json({
      totalTelecallers,
      totalCalls,
      totalConnected,
      callTrends,
      connectedCalls
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

module.exports = { getDashboardData };
