const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Item schema
const itemSchema = new Schema({
  size: {
    type: String,
    required: false // Make it optional
  },
  owner: {
    type: String,
    default: null // Default value for owner field
  }
});

// Define the Product schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true // Add unique constraint to the name field
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  pricing: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  sizes: {
    type: [String], // Array of available sizes for the product
    required: false // Make it optional
  },
  items: {
    type: [itemSchema],
    default: []
  },
  published: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  archived: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Product', productSchema);
