const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  user_tag: {
    type: String,
    required: true,
  },
  user_message: {
    type: String,
    required: true,
  },
  message_created: {
    type: Date,
  },
});

module.exports = mongoose.model("Note", noteSchema);
