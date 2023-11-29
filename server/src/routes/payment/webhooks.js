const { sendMail } = require("../../utils/mailer");
const { addPayment } = require("../../models/payments/payments.data");

const checkoutSessionCompleted = (event) =>{
    // TODO: email reciept to custoemr, email hector about purchase details, add services to client profile
    const { customer_details, created, amount_total, metadata } = event;
    const respondSubject = "Reciept"
    const respondMessage = `Thanks ${customer_details.name}, we have confirmed your payment of $${amount_total}, your account will be updated accordanly.`
    sendMail(body.email, respondSubject, respondMessage)

    const userSubject = "Empower Canine New Purchase"
    const userMessage = `Name: ${customer_details.name} \nEmail: ${customer_details.email}\nPurchased: ${metadata.service} \nDate: ${created}`
    sendMail("oscardel413@gmail.com", userSubject, userMessage)

    addPayment(event)

    // addServices(service)

    return event
}

module.exports = {
    checkoutSessionCompleted
}