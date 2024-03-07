const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  product: {
    type: String,
    required: true
  },
  item: {
    type: String,
    required: true
  }
})

// Define the User schema
const userSchema = new Schema({
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
  items: {
    type: [itemSchema], // Array of items bought by the user
    default: []
  },
  phone: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  accessLevel: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model('User', userSchema);
