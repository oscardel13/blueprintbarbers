// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.

require('dotenv').config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = "whsec_390a14c1ab72312dcd9188cd30c7d48363428f95b115b4248c57e08b9874729d";

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };
  
const httpPaymentIntent = async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

const httpWebhook = async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event = request.body.event

  // try {
  //   event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  // } catch (err) {
  //   response.status(400).send(`Webhook Error: ${err.message}`);
  //   return;
  // }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log(paymentIntentSucceeded)
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      console.log(checkoutSessionCompleted)
      // Then define and call a function to handle the event checkout.session.completed
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
}

module.exports = {
    httpPaymentIntent,
    httpWebhook
}
