// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.

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
    itemsTrim = items.map(item => {
        return {
            _id: item._id,
            name: item.name,
            pricing: item.pricing,
            size: item.size,
            quantity: item.quantity,
        }
    
    })

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
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
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
            console.log("event: ", event.data.object)
        case 'charge.succeeded':
            /*
            TODO: 
                1. Update Order to Processing
                2. update items owner to client gid 
                3. add items to client inventory 
                4. send email to client
            */
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
