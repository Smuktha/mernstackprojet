const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const protect = require('../middleware/auth');

// Add agent
router.post('/add', protect, agentController.addAgent);

// List agents
router.get('/', protect, agentController.listAgents);

module.exports = router;
