import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

import { loadStripe } from "@stripe/stripe-js";
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '../checkout-form/checkout-form.component'
import { selectCartItems } from '../../../../store/cart/cart.selector';
import { postAPI } from '../../../../utils/api';
import { Link } from 'react-router-dom';

function Payment({method, deliveryAddress}) {
    const cartItems = useSelector(selectCartItems);
    const user = useSelector(state => state.user.currentUser);
    const paymentIntent = {
        user,
        items: cartItems,
    }

    const stripePromise = loadStripe("pk_test_51OHepjEaoH01PH0iCraMmXrYUt5t1PXWn3cDtQmCiBZBw5bB1VEuS6SqhfJ35JjnfOEz9JU9hEUtjn00YIeWrOqh006HbEkOFJ");
    const [ clientSecret, setClientSecret ] = useState('');

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        const createPaymentIntent = async () => {
            try{
                const res = await postAPI(`/payment/create-payment-intent`, paymentIntent)
                setClientSecret(res.data.clientSecret)
            }
            catch(err){
                console.log(err)
            }
            
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
        ) || 
            <div className='flex flex-col'>
                <p>Must be signed in!</p>
                <Link to="/sign-in" className='underline font-semibold text-xl mt-2'>Sign In</Link> {/* BUILD MODAL SIGN IN LATER OR JUST REDIRECT TO SIGN IN LIKE THE API.BLUE...*/}
            </div>
        }
        </div>
    );
}

export default Payment;