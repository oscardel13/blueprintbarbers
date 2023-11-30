// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.

const { paymentIntentCreated, paymentIntentSucceeded, paymentIntentFailed, paymentIntentCanceled } = require('./webhooks');

require('dotenv').config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_END_POINT_SECRET;

const calculateOrderAmount = (items) => {
    const total = items.reduce((acc, item) => acc + item.pricing * item.quantity, 0);
    // const total = total + shipping 
    // const total = total * tax 
    return total*100;
  };
  
const httpPaymentIntent = async (req, res) => {
    const user = req.user;
    const { items } = req.body;
    const order = await paymentIntentCreated({
        client: user.gid,
        total: calculateOrderAmount(items),
        items: items,
    })
  
    const paymentIntent = await stripe.paymentIntents.create({
        amount: order.total,
        currency: "usd",
        automatic_payment_methods: {
        enabled: true,
        },
        metadata: {
            orderId: order._id.toString()
        }
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
};
 
const httpWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    const eventObj = event.data.object;
 
    // Handle the event
    switch (event.type) {
        case 'payment_intent.canceled':
            paymentIntentCanceled(eventObj)
        case 'payment_intent.succeeded':
            paymentIntentSucceeded(eventObj)
        case 'payment_intent.failed':
            paymentIntentFailed(eventObj)
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send();
}

module.exports = {
    httpPaymentIntent,
    httpWebhook
}
