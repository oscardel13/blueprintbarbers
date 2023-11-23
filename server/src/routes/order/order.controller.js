const { getOrders, getOrder, createOrder, updateOrder, cancelOrder } = require('../../models/orders/orders.data')

const httpGetOrders = async (req, res) => {
    try{
        const orders = await getOrders()
        res.status(200).json(orders)
    }
    catch(err){
        res.status(400).json(err)
    }
}

const httpGetOrder = async (req, res) => {
    try{
        const order = await getOrder(req.params.id)
        res.status(200).json(order)
    }
    catch(err){
        res.status(400).json(err)
    }
}

const httpCreateOrder = async (req, res) => {
    try{
        const order = await createOrder(req.body)
        res.status(200).json(order)
    }
    catch(err){
        res.status(400).json(err)
    }
}

const httpUpdateOrder = async (req, res) => {
    try{
        const order = await updateOrder(req.params.id, req.body)
        res.status(200).json(order)
    }
    catch(err){
        res.status(400).json(err)
    }
}

const httpCancelOrder = async (req, res) => {
    try{
        const order = await cancelOrder(req.params.id)
        res.status(200).json(order)
    }
    catch(err){
        res.status(400).json(err)
    }
}

module.exports = {
    httpGetOrders,
    httpGetOrder,
    httpCreateOrder,
    httpUpdateOrder,
    httpCancelOrder
}