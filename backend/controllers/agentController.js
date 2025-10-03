const Agent = require('../models/Agent');

exports.addAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const exists = await Agent.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Agent already exists' });

    const agent = new Agent({ name, email, mobile, password });
    await agent.save();
    res.json({ message: 'Agent added successfully', agent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
