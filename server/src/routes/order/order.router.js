const express = require('express')

const { 
    httpCancelOrder, 
    httpCreateOrder, 
    httpGetOrder, 
    httpGetOrders, 
    httpUpdateOrder
} = require('./order.controller')

const OrderAPI = express.Router()


OrderAPI.get('/', httpGetOrders)
OrderAPI.get('/:id', httpGetOrder)
OrderAPI.post('/', httpCreateOrder)
OrderAPI.put('/:id', httpUpdateOrder)
OrderAPI.put('/:id', httpCancelOrder)

module.exports = OrderAPI