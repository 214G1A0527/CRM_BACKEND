const express = require('express');
const router = express.Router();
const {
  addLead,
  getLeads,
  editLeadAddress,
  deleteLead,
  updateStatus
} = require('../controllers/leadController');

const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

// All routes below are protected and for telecallers
router.use(authMiddleware, authorizeRoles('telecaller'));

router.post('/', addLead);
router.get('/', getLeads);
router.put('/:id', editLeadAddress);
router.delete('/:id', deleteLead);
router.put('/status/:id', updateStatus);

module.exports = router;
