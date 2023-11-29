import CheckOutItems from './components/checkout-items/checkout-items.component';
import DeliveryMethod from '../checkout/components/delivery-method/delivery-method.component';
import { Link } from 'react-router-dom';

const Cart = () => {
    return (
        <div className="container mx-auto py-4 px-4 min-h-screen md:px-40">
            <h1 className="text-2xl font-bold mb-4">Cart</h1>
            <CheckOutItems />
            <div className='flex justify-end pt-4'>
                <Link className="flex w-60 h-12 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 justify-center items-center rounded-md" to="/checkout">
                    Proceed to Checkout
                </Link>
            </div>
        </div>
    )
}

export default Cart;