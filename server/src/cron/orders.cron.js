const { getPendingOrders, deleteOrder } = require("../models/orders/orders.data");
const { unlockItems } = require("../routes/payment/webhooks.helper");


async function checkAndHandleExpiredOrders(){
    console.log("Checking for expired orders========================================================");
    try{
        const orders = await getPendingOrders()
        const currentTime = new Date().getTime();
        for (let i=0; i < orders.length; i++){
            const order = orders[i]
            const timeElapsed = (currentTime - new Date(order.date).getTime()) / (1000 * 60);
            if (timeElapsed > 5) {
                await unlockItems(order.id)
                await deleteOrder(order.id)
            }
        }
    }
    catch(err){
        console.log(err)
    }
}

async function expiredOrdersCronJob(){
    setInterval(checkAndHandleExpiredOrders, 1000 * 60);
}

module.exports = expiredOrdersCronJob;