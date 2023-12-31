const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  }
});

module.exports = mongoose.model("Category", categorySchema);
