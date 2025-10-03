const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');
const AssignedLead = require('../models/AssignedLead');
const Agent = require('../models/Agent');
const protect = require('../middleware/auth');

const upload = multer({ dest: 'uploads/' });

// Upload and assign leads
router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const agents = await Agent.find();
    if (!agents.length) return res.status(400).json({ message: 'No agents to assign leads' });

    // Delete old leads before new upload
    await AssignedLead.deleteMany({});

    const leads = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (row) => leads.push(row))
      .on('end', async () => {
        let index = 0;
        for (const lead of leads) {
          const agent = agents[index % agents.length];
          await AssignedLead.create({ agent: agent._id, ...lead });
          index++;
        }
        fs.unlinkSync(req.file.path); // remove uploaded file
        res.json({ message: 'Leads uploaded and assigned successfully' });
      });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all assigned leads
router.get('/', protect, async (req, res) => {
  try {
    const assigned = await AssignedLead.find().populate('agent', 'name email mobile');
    res.json(assigned);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Optional: Delete all assigned leads manually
router.delete('/', protect, async (req, res) => {
  try {
    await AssignedLead.deleteMany({});
    res.json({ message: 'All assigned leads deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
