import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../checkout-form/checkout-form.component";
import {
  selectCartItems,
  selectOrderId,
} from "../../../../../store/cart/cart.selector";
import { postAPI } from "../../../../../utils/api";
import { Link } from "react-router-dom";
import { setOrderId } from "../../../../../store/cart/cart.reducer";
import { toggleSignIn } from "../../../../../store/user/user.reducer";

function Payment({ method, deliveryAddress }) {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);
  const [clientSecret, setClientSecret] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const orderId = useSelector(selectOrderId);
  const paymentIntent = {
    products: cartItems,
    orderId,
  };

  const triggerSignIn = () => {
    dispatch(toggleSignIn());
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      console.log("paymentIntent:", paymentIntent);
      try {
        const res = await postAPI(
          `/payment/create-payment-intent`,
          paymentIntent
        );
        setClientSecret(res.data.clientSecret);
        dispatch(setOrderId(res.data.orderId));
      } catch (err) {
        if (err.response.status === 401) {
          triggerSignIn();
          return;
        }
        console.log("ERROR IS THIS:", err.response.status);
        window.alert(err.response.data);
      }
    };

    createPaymentIntent();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  return (
    <div className="w-full pt-2 pl-5 pr-5 lg:pb-16 lg:pr-12 lg:pl-40">
      <h2 className="text-2xl font-bold mb-6 w-screen">Payment</h2>
      {(clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          <CheckoutForm
            method={method}
            deliveryAddress={deliveryAddress}
            orderId={orderId}
          />
        </Elements>
      )) || (
        <div className="flex flex-col">
          <p>Must be signed in and cart cannot be empty!</p>
          <button
            onClick={triggerSignIn}
            className="text-left underline font-semibold text-xl mt-2"
          >
            Sign In
          </button>{" "}
          {/* BUILD MODAL SIGN IN LATER OR JUST REDIRECT TO SIGN IN LIKE THE API.BLUE...*/}
        </div>
      )}
    </div>
  );
}

export default Payment;
