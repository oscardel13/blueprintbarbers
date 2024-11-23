import { Route } from "react-router-dom";
import PaymentConfirmationPage from "./payment-confirmation/payment-confirmation.route";
import PrivacyPolicyPage from "./privacy-policy/privacy-policy.route";
import TermAndConditionsPage from "./terms-and-conditions/terms-and-conditions.route";
import Cart from "./cart/cart.route";
import Checkout from "./checkout/checkout.route";
import BookingConfirmed from "./booking-confirmed/booking-confirmed.route";

function MiscRoutes() {
  return (
    <>
      <Route
        path="payment-confirmation"
        element={<PaymentConfirmationPage />}
      />
      <Route path="legal/privacy" element={<PrivacyPolicyPage />} />
      <Route path="legal/terms" element={<TermAndConditionsPage />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="booking-confirmed" element={<BookingConfirmed />} />
    </>
  );
}

export default MiscRoutes;
