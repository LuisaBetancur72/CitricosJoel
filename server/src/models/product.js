const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  image1: {
    type: String, 
    required: true,
  },
  image2: {
    type: String, 
    required: true,
  },
  image3: {
    type: String, 
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  soldOut: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model('Product', productSchema);
