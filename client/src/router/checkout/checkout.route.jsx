import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

import DeliveryMethod from "./components/delivery-method/delivery-method.component";
import OrderSummary from "../cart/components/order-summary/order-summary.component";
import Payment from './components/payment/payment.component';

const Checkout = ({stripePromise}) => {
    const cartItems = useSelector(selectCartItems);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen overflow-x-hidden">
            <div className="flex bg-gray-100 lg:h-screen lg:w-3/6 flex-col shadow-md">
                <div className='overflow-y-auto overflow-x-hidden pb-12'>
                    <DeliveryMethod />
                    <Payment stripePromise={stripePromise}/>
                </div>
            </div>
            <div className="bg-gray-300 lg:h-screen lg:w-3/6 shadow-md ">
                <OrderSummary items={cartItems}/>
            </div>
        </div>
    )
}

export default Checkout;