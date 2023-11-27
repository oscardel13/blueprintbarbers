const { checkIfAdmin } = require('../../models/client/client.data')
const { getOrders, getOrder, createOrder, updateOrder, cancelOrder } = require('../../models/orders/orders.data')

const httpGetOrders = async (req, res) => {
    const user = req.user
    try{
        const isAdmin = await checkIfAdmin(user.gid)
        const orders = await getOrders()
        if (isAdmin)
            res.status(200).json(orders)
        else{
            const userOrders = orders.filter(order => order.client === user.gid)
            res.status(200).json(userOrders)
        }
    }
    catch(err){
        res.status(400).json(err)
    }
}

const httpGetOrder = async (req, res) => {
    const user = req.user
    try{
        const isAdmin = await checkIfAdmin(user.gid)
        const order = await getOrder(req.params.id)
        if (isAdmin || order.client === user.gid)
            res.status(200).json(order)
        else
            res.status(401).json({message: "Unauthorized"})
    }
    catch(err){
        res.status(400).json(err)
    }
}

// anyone can use
const httpCreateOrder = async (req, res) => {
    try{
        const order = await createOrder(req.body)
        res.status(200).json(order)
    }
    catch(err){
        res.status(400).json(err)
    }
}

// Only admin and owner can edit
const httpUpdateOrder = async (req, res) => {
    try{
        const order = await updateOrder(req.params.id, req.body)
        res.status(200).json(order)
    }
    catch(err){
        res.status(400).json(err)
    }
}

// Only admin and owner can edit
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