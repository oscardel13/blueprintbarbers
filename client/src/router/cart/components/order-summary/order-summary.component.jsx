import { useSelector } from 'react-redux';
import { selectCartItems } from '../../../../store/cart/cart.selector';

const OrderSummary = ({items}) => {
    const subtotal = items.reduce( (total, item) => total + item.pricing, 0)
    const shipping = 5
    const total = subtotal + shipping
    return (
        <div className="pl-12 pr-12 lg:pr-72 py-5">
            <h2 className="font-bold text-2xl">Order Summary</h2>
            <br/>
            {
                items.map( (item, index) => (
                    <div className="flex items-center py-4 mb-0 rounded-md h-32" key={index}>
                        <div className="flex w-5/6">
                            <img
                                src={item.images[0]} // Replace with the actual path to your product images
                                alt={item.name}
                                className="w-24 h-28 object-cover rounded-md"
                            />
                            &nbsp;
                            &nbsp;
                            <div className='flex flex-col items-center cursor-pointer text-left justify-center pr-12'>
                                <h3 className='font-semibold'>{item.name}</h3>
                                <span className='text-sm'>{item.quantity}x</span>
                                <span className='text-sm'>Size: {item.size}</span>
                            </div>
                        </div>
                        <div className="w-1/6">${item.pricing}.00</div>
                    </div>
                ))
            }
            <br/>
            <div className="grid grid-cols-2">
                <div className="flex flex-col items-start justify-start">
                    <span className="font-bold">Subtotal</span>
                    <span className="font-bold">Shipping</span>
                    {/* <span className="font-bold">Taxes</span> */}
                    <span className="font-bold">Total</span>
                </div>
                <div className="flex flex-col items-end justify-end">
                    <span>${subtotal}.00</span>
                    <span>${shipping}.00</span>
                    {/* <span>${taxes}.00</span> */}
                    <span>${total}.00</span>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary;