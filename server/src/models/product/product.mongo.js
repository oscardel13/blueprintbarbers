const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Item schema
const itemSchema = new Schema({
  size: {
    type: String,
    required: false // Make it optional
  },
  status: {
    type: String,
    enum: ['initialized', 'printing', 'ready'],
    default: 'initialized'
  },
  owner: {
    type: String,
    default: "" // Default value for owner field
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true
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
    default: ['https://blue-print-static.s3.amazonaws.com/product_defult.jpg']
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
