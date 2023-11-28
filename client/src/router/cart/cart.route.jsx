import CheckOutItems from './components/checkout-items/checkout-items.component';
import DeliveryMethod from '../checkout/components/delivery-method/delivery-method.component';
import { Link } from 'react-router-dom';

const Cart = () => {
    return (
        <div className="container mx-auto py-4 px-4 min-h-screen md:px-40">
            <h1 className="text-2xl font-bold mb-4">Cart</h1>
            <CheckOutItems />
            <div className='text-right'>
                <Link className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md mt-4" to="/checkout">
                    Proceed to Payment
                </Link>
            </div>
        </div>
    )
}

export default Cart;