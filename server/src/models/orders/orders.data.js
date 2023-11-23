const mongoose = require('mongoose');
const orderSchema = require('./orders.mongo');

const getOrders = async () => {
    return await orderSchema.find();
}

const getOrder = async (id) => {
    return await orderSchema.findOne({_id: id});
}

const createOrder = async (order) => {
    return await orderSchema.create(order);
}

const updateOrder = async (id, order) => {
    return await orderSchema.findOneAndUpdate({ _id: id }, { $set: order }, {returnDocument: 'after'})
}

const cancelOrder = async (id) => {
    return await orderSchema.findOneAndUpdate({ _id: id }, { $set: { status: 'canceled' } }, {returnDocument: 'after'})
}

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    cancelOrder
}