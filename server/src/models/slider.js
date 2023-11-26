const mongoose = require("mongoose");

const SliderSchema = mongoose.Schema({
  title: String,
  Create_at: {
    type:Date,
    default: Date.now,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  }
});

module.exports = mongoose.model("Slider", SliderSchema);
