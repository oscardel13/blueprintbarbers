import {
    PaymentElement,
    LinkAuthenticationElement
} from '@stripe/react-stripe-js'
import {useState} from 'react'
import {useStripe, useElements} from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';

const validateDeliveryAddress = (address) => {
  const missingFields = [];

  if (!address.country) {
    missingFields.push('Country');
  }

  if (!address.name) {
    missingFields.push('Name');
  }

  if (!address.line1) {
    missingFields.push('Address Line 1');
  }

  if (!address.city) {
    missingFields.push('City');
  }

  if (!address.state) {
    missingFields.push('State');
  }

  if (!address.postal_code) {
    missingFields.push('Postal Code');
  }

  if (missingFields.length === 0) {
    return null; // No missing fields
  }

  const missingFieldsMessage = `Missing information: ${missingFields.join(', ')}`;
  return missingFieldsMessage;
};


export default function CheckoutForm({method, deliveryAddress, orderId}) {
  const client_email = useSelector((state) => state.user.currentUser.email)
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(elements)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    
    let shippingAddress = null
    if (method === 'delivery') {
      const validationError = validateDeliveryAddress(deliveryAddress);

      if (validationError) {
        setMessage(validationError);
        setIsLoading(false);
        return;
      }
      
      const { name, ...address } = deliveryAddress;
      shippingAddress = {
        name : name,
        address : address
      }
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/payment-confirmation?orderId=${orderId}`,
        shipping: shippingAddress,
        receipt_email: client_email
      }
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* <LinkAuthenticationElement id="link-authentication-element"
        // Access the email value like so:
        // onChange={(event) => {
        //  setEmail(event.value.email);
        // }}
        //
        // Prefill the email field like so:
        // options={{defaultValues: {email: 'foo@bar.com'}}}
        /> */}
      <PaymentElement id="payment-element" />
      <br/>
      <br/>
      <button disabled={isLoading || !stripe || !elements} id="submit" className='bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 h-12'>
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}