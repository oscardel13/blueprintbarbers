const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Order schema
const orderSchema = new Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId
  },
  items: {
    type: [String], // Array of items bought by the client
    default: []
  },
  orderDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  total: {
    type: Number,
    default: 0,
    required: true
  }
});

// Define the Client schema
const clientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gid: {
    type: String,
    required: true,
    unique: true
  },
  picture: {
    type: String,
    required: true,
  },
  orders: {
    type: [orderSchema], // Array of orders
    default: []
  },
  items: {
    type: [String], // Array of items bought by the client
    default: []
  },
  phone: {
    type: String,
    required: false // Make it optional
  },
  address: {
    type: String,
    required: false // Make it optional
  },
  accessLevel: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model('Client', clientSchema);
