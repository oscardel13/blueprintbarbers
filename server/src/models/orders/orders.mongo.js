const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  client: {
    type: String,
    ref: 'Client', // Assuming 'Client' is the name of the client model
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'ready', 'completed', 'canceled', 'rejected'], // Add more statuses if needed
    default: 'pending'
  },
  items: [
    {
      product: {
        type: String,
        ref: 'Product', // Assuming 'Product' is the name of the product model
        required: true
      },
      name: {
        type: String,
        required: true
      },
      pricing: {
        type: Number,
        required: true
      },
      size: {
        type: String,
      },

      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  logs: [
    {
      timestamp: {
        type: Date,
        default: Date.now
      },
      message: {
        type: String,
        required: true
      }
      // You can add more fields related to the logs if needed
    }
  ],
  shipping: {
    name: {
      type: String,
    },
    address: {
      line1: {
        type: String,
      },
      line2: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      postal_code: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    carrier: {
      type: String,
    },
    phone: {
      type: String,
    },
    tracking_number: {
      type: String,
    },
  }
});

module.exports = mongoose.model('Order', orderSchema);
