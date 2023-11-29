const express = require('express')

const ProductRouter = require('./product/product.router')
// const PaymentRouter = require('./payment/payment.router');
const ClientRouter = require('./client/client.router');
const AuthRouter = require('./auth/auth.router');
const OrderRouter = require('./order/order.router');
const PaymentRouter = require('./payment/payment.router');


const api = express.Router();

api.use('/clients', express.json(),ClientRouter)
api.use('/auth', express.json(),AuthRouter)
api.use('/products', express.json(),ProductRouter)
api.use('/payment',PaymentRouter)
api.use('/orders', express.json(),OrderRouter)


module.exports = api;