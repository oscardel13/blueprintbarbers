const { sendMail } = require("../../utils/mailer");
const { createOrder, updateOrder, deleteOrder, getOrder } = require("../../models/orders/orders.data"); 
const { getUser, updateUser } = require("../../models/user/user.data");
const { getProduct, updateProduct } = require("../../models/product/product.data");

//ADD CHECK HERE TO MAKE SURE ITEMS ARE STILL AVAILABLE IF NOT DO NOT CREATE ORDER
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

async function assignItems(user, itemsBought){
    const updatedUser = user
    for(let itemBought of itemsBought){
        const { name, size } = itemBought
        let quantity = itemBought.quantity
        const product = await getProduct(name)
        const { items } = product
        for (let i=0;i<items.length;i++){
            const item = items[i]
            if ( item.size === size && item.owner===null){
                quantity -= 1
                product.items[i].owner = updatedUser.gid
                updatedUser.items.push(item._id)
            }
            if ( quantity === 0 ){
                break
            }
        }
        await updateProduct(name, product)        
    }
    await updateUser(updatedUser)
}

const paymentIntentSucceeded = async (event) =>{
    const { metadata, shipping } = event
    const { orderId } = metadata
    try{
        const order = await getOrder(orderId)
        const user = await getUser(order.user)
        assignItems(user, order.items)
        order.status = "processing"
        order.shipping = shipping
        await updateOrder(orderId, order)
        // UPDATE LATER
        sendMail(user.email, "Order Confirmation", "Your order has been confirmed. We are processing it soon and will send tracking number.")
        console.log("Payment Intent Succeeded -------------------------------------------")

    }
    catch(err){
        console.log(err)
    }
} 

/*
TODO: 
    1. Update Order to faliled
    4. send email to user
*/
const paymentIntentFailed = async(event) =>{
    const { metadata } = event
    const { orderId } = metadata
    try{
        const order = await getOrder(orderId)
        const user = await getUser(order.user)
        order.status = "failed"
        await updateOrder(orderId, order)
        // UPDATE LATER
        sendMail(user.email, "Order Failed", "Your payment was unsuccessful. Please try again.") 
        console.log("Payment Intent Failed -------------------------------------------")
    }
    catch(err){
        console.log(err)
    }   
    }
    
// Later on update this to remove holder on the items
const paymentIntentCanceled = async(event) =>{
    const { metadata } = event
    const { orderId } = metadata
    try{
        await deleteOrder(orderId)
    }
    catch(err){
        console.log(err)
    }
    console.log("Payment Intent Canceled -------------------------------------------")

}

module.exports = {
    paymentIntentCreated,
    paymentIntentSucceeded,
    paymentIntentFailed,
    paymentIntentCanceled
}