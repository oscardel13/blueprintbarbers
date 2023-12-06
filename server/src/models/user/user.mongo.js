const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    type: [String], // Array of items bought by the user
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

module.exports = mongoose.model('User', userSchema);
