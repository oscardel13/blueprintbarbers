const { Router } = require("express");

const PaymentRouter = Router();

const { httpPaymentIntent, httpWebhook } = require('./payment.controller');

//Routes
PaymentRouter.post("/create-payment-intent", httpPaymentIntent)
PaymentRouter.post("/webhook", httpWebhook)

module.exports = PaymentRouter;