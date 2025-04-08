const Lead = require('../models/Lead');

// Add new lead
const addLead = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const newLead = new Lead({
      name,
      email,
      phone,
      address,
      telecaller: req.user.id
    });

    const saved = await newLead.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Get all leads (telecaller’s own leads)
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ telecaller: req.user.id });
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Edit only address
const editLeadAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { address } = req.body;

    const updated = await Lead.findOneAndUpdate(
      { _id: id, telecaller: req.user.id },
      { address, updatedAt: Date.now() },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Delete a lead
const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    await Lead.findOneAndDelete({ _id: id, telecaller: req.user.id });
    res.status(200).json({ msg: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Update call status
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { connected, response } = req.body;

    const updated = await Lead.findOneAndUpdate(
      { _id: id, telecaller: req.user.id },
      {
        status: {
          connected,
          response
        },
        updatedAt: Date.now()
      },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

module.exports = {
  addLead,
  getLeads,
  editLeadAddress,
  deleteLead,
  updateStatus
};
