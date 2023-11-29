import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

import { loadStripe } from "@stripe/stripe-js";
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '../checkout-form/checkout-form.component'
import { selectCartItems } from '../../../../store/cart/cart.selector';
import { postAPI } from '../../../../utils/api';

function Payment({method, deliveryAddress}) {
    const cartItems = useSelector(selectCartItems);
    const user = useSelector(state => state.user.currentUser);
    const paymentIntent = {
        user,
        items: cartItems,
    }

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);
    const [ clientSecret, setClientSecret ] = useState('');

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        const createPaymentIntent = async () => {
            const res = await postAPI(`/payment/create-payment-intent`, paymentIntent)
            setClientSecret(res.data.clientSecret)
        }

        createPaymentIntent()
      }, []);

    const appearance = {
        theme: 'stripe',
    }
    return (
        <div className="w-full pt-2 pl-5 pr-5 lg:pb-16 lg:pr-12 lg:pl-40">
        <h2 className="text-2xl font-bold mb-6 w-screen">Payment</h2>
        {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance}}>
                <CheckoutForm method={method} deliveryAddress={deliveryAddress}/>
            </Elements>
        )}
        </div>
    );
}

export default Payment;