const express = require('express')

const ProductRouter = require('./product/product.router')
// const PaymentRouter = require('./payment/payment.router');
const UserRouter = require('./user/user.router');
const AuthRouter = require('./auth/auth.router');
const OrderRouter = require('./order/order.router');
const PaymentRouter = require('./payment/payment.router');


const api = express.Router();

api.use('/users', express.json(),UserRouter)
api.use('/auth', express.json(),AuthRouter)
api.use('/products', express.json(),ProductRouter)
api.use('/payment',PaymentRouter)
api.use('/orders', express.json(),OrderRouter)


module.exports = api;