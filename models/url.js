const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  short_id: {
    type: String,
    required: true,
    unique: true,
  },
  redirect_url: {
    type: String,
    required: true,
  },
  visit_history: [
    {
      timestamp: { type: Number },
    },
  ],

  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
