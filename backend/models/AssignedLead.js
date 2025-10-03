const mongoose = require('mongoose');

const assignedLeadSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  FirstName: String,
  Phone: String,
  Notes: String
}, { timestamps: true });

module.exports = mongoose.model('AssignedLead', assignedLeadSchema);
