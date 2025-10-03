const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);
