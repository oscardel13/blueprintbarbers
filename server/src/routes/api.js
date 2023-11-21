const express = require('express')

const ProductRouter = require('./product/product.router')
// const PaymentRouter = require('./payment/payment.router');
const ClientRouter = require('./client/client.router');
const AuthRouter = require('./auth/auth.router');


const api = express.Router();

api.use('/clients', ClientRouter)
api.use('/auth', AuthRouter)
api.use('/products', ProductRouter)
// api.use('/payment', PaymentRouter)


module.exports = api;