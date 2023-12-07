const mongoose = require('mongoose');
const orderSchema = require('./orders.mongo');

const getOrders = async (skip, limit, gid = null) => {
    if (gid) {
        return await orderSchema.find({ user: gid }).skip(skip).limit(limit).sort('-date');
    }
    console.log("here =========================================================")
    return await orderSchema.find().skip(skip).limit(limit).sort('-date');
}

const getOrder = async (id) => {
    return await orderSchema.findOne({_id: id});
}

const createOrder = async (order) => {
    return await orderSchema.create(order);
}

const updateOrder = async (id, order) => {
    return await orderSchema.findOneAndUpdate({ _id: id }, order, {returnDocument: 'after'})
}

const cancelOrder = async (id) => {
    return await orderSchema.findOneAndUpdate({ _id: id }, { $set: { status: 'canceled' } }, {returnDocument: 'after'})
}

const deleteOrder = async (id) => {
    return await orderSchema.deleteOne({ _id: id })
}

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    cancelOrder,
    deleteOrder
}