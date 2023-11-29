import {useEffect, useState} from 'react';

import { loadStripe } from "@stripe/stripe-js";
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '../checkout-form/checkout-form.component'

const API_URL = process.env.REACT_APP_API_URL || "https://api.blueprintbarbers.co"

function Payment(props) {
    const stripePromise = loadStripe("pk_test_51OHepjEaoH01PH0iCraMmXrYUt5t1PXWn3cDtQmCiBZBw5bB1VEuS6SqhfJ35JjnfOEz9JU9hEUtjn00YIeWrOqh006HbEkOFJ");
    // const { stripePromise } = props;
    const [ clientSecret, setClientSecret ] = useState('');

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(`${API_URL}/payment/create-payment-intent`, {
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
        <div className="w-full pt-2 pl-5 pr-5 lg:pb-16 lg:pr-12 lg:pl-40">
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