// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.

require('dotenv').config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = "whsec_8a2b7b20360bb42a898f1fddb97e2c87dcba46e91291ff6977e13d0b10a2f5ae";

const calculateOrderAmount = (items) => {
    const total = items.reduce((acc, item) => acc + item.pricing * item.quantity, 0);
    // const total = total + shipping 
    // const total = total * tax 
    return total*100;
  };
  
const httpPaymentIntent = async (req, res) => {
    const user = req.user;
    const { items } = req.body;
    itemsTrim = items.map(item => {
        return {
            _id: item._id,
            name: item.name,
            pricing: item.pricing,
            size: item.size,
            quantity: item.quantity,
        }
    
    })
    console.log("itemsTrim: ", itemsTrim)
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        automatic_payment_methods: {
        enabled: true,
        },
        metadata: {
            user: user.gid,
            items: JSON.stringify(itemsTrim)
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
    console.log("event: ", event.data.object)
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            // TODO: Create Order
            // const paymentIntentSucceeded = event.data.object;
            // await stripe.paymentIntents.update(paymentIntent.id, {
            //     metadata: {
            //       orderId: orderId,
            //       // Add other metadata fields as needed
            //     },
            //   });
        
            console.log("paymentIntentSucceeded")
        case 'charge.succeeded':
            // TODO: Update Order to Processing and update items owner to client gid 
            //       and add to client inventory
            console.log("CHARGE COMPLETED")
        break;
        // ... handle other event types
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
