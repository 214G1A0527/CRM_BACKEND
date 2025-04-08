const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/adminController');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

// Admin only
router.get('/dashboard', authMiddleware, authorizeRoles('admin'), getDashboardData);

module.exports = router;
