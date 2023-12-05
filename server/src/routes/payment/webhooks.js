const { sendMail } = require("../../utils/mailer");
const { createOrder, updateOrder, deleteOrder, getOrder } = require("../../models/orders/orders.data"); 

const paymentIntentCreated = async (order) =>{
    order.items = order.items.map(item => {
        return {
            product: item._id,
            name: item.name,
            pricing: item.pricing,
            size: item.size,
            quantity: item.quantity,
            image: item.images[0]
        }
    
    })
    const createdOrder = await createOrder(order)
    return createdOrder
}

/*
TODO:  
    2. update items owner to client gid 
    3. add items to client inventory 
    4. send email to client
*/
const paymentIntentSucceeded = async (event) =>{
    const { metadata, shipping } = event
    const { orderId } = metadata
    try{
        const order = await getOrder(orderId)
        order.status = "processing"
        order.shipping = shipping
        await updateOrder(order)
    }
    catch(err){
        console.log(err)
    }
} 

/*
TODO: 
    1. Update Order to faliled
    4. send email to client
*/
const paymentIntentFailed = async(event) =>{
    const { metadata } = event
    const { orderId } = metadata
    try{
        const order = await getOrder(orderId)
        order.status = "failed"
        await updateOrder(order)
    }
    catch(err){
        console.log(err)
    }   
    }
    

const paymentIntentCanceled = async(event) =>{
    const { metadata } = event
    const { orderId } = metadata
    try{
        await deleteOrder(orderId)
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {
    paymentIntentCreated,
    paymentIntentSucceeded,
    paymentIntentFailed,
    paymentIntentCanceled
}