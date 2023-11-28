import {useEffect, useState} from 'react';

import { loadStripe } from "@stripe/stripe-js";
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '../checkout-form/checkout-form.component'

function Payment(props) {
    const stripePromise = loadStripe("pk_test_51MVmanJs5AxisWVj8UwPq1KYjavDf5yQh2u1V9Qt424V11EGFT49z8Q7j8RQCiqPQmKnYjsoos1JJuVPRkXYZoBG00DuKgCjVK");
    // const { stripePromise } = props;
    const [ clientSecret, setClientSecret ] = useState('');

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://api.empowercanine.com/payment/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, []);

    const appearance = {
        theme: 'stripe',
    }
    return (
        <div className="w-full mt-8 py-6 pl-5 pr-5 lg:pr-12 lg:pl-40">
        <h2 className="text-2xl font-bold mb-6 w-screen">Payment</h2>
        {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance}}>
            <CheckoutForm />
            </Elements>
        )}
        </div>
    );
}

export default Payment;