const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  images: { type: [String], default: [] }, 
  stockQuantity: { type: Number, required: true },
  brand: { type: String, required: true },
  tags: { type: [String], required: true }
});

module.exports = mongoose.model('Product', productSchema);
