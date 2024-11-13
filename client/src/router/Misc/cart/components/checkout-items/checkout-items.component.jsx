import { useSelector } from "react-redux";
import { selectCartItems } from "../../../../../store/cart/cart.selector";
import CheckoutItem from "../checkout-item/checkout-item.component";

const CheckOutItems = () => {
  const cartItems = useSelector(selectCartItems);
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.pricing * item.quantity,
      0
    );
  };
  return (
    <>
      <div
        className={`grid grid-cols-2 md:grid-cols-4 border-b border-gray-300 pb-2`}
      >
        <div className="font-bold">Product</div>
        <div className="font-bold text-center">Price</div>
        <div className="font-bold text-center hidden md:block">Quantity</div>
        <div className="font-bold text-center hidden md:block">Total</div>
      </div>
      {cartItems.map((item, index) => (
        <CheckoutItem item={item} key={index} />
      ))}
      <div className="grid grid-cols-4 py-2">
        <div className="col-span-3 font-bold text-right">Subtotal:</div>
        <div className="font-bold text-center">
          ${calculateTotal().toFixed(2)}
        </div>
        <br />
        <p className="col-span-4 text-right">
          Taxes and shipping calculated at checkout
        </p>
      </div>
    </>
  );
};

export default CheckOutItems;
