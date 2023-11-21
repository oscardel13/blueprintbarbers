import CheckOutItems from './components/checkout-items/checkout-items.component';

const Checkout = () => {
    return (
        <div className="container mx-auto py-4 px-4 min-h-screen md:px-40">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <CheckOutItems />
            <div className='text-right'>
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md mt-4">
                    Proceed to Payment
                </button>
            </div>
        </div>
    )
}

export default Checkout;