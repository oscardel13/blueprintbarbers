import { Route } from "react-router-dom";
import PaymentConfirmationPage from "./payment-confirmation/payment-confirmation.route";
import PrivacyPolicyPage from "./privacy-policy/privacy-policy.router";
import TermAndConditionsPage from "./terms-and-conditions/terms-and-conditions.router";
import Cart from "./cart/cart.route";
import Checkout from "./checkout/checkout.route";

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
    </>
  );
}

export default MiscRoutes;
