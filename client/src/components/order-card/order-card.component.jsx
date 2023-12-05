import { Link } from 'react-router-dom';

const OrderCard = ({ _id, total, date, status, items }) => {
    console.log(items)

    return (
        <div className="flex flex-col">
            <div className="flex flex-row bg-gray-300 text-black">
                <div className="flex flex-auto flex-col">
                    <p className="text-gray-800">Order Placed</p>
                    <p>
                        {new Date(date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </p>
                </div>

                <div className="flex flex-auto flex-col">
                    <p className="text-gray-800">Order Status</p>
                    <p>{status}</p>
                </div>

                <div className="flex flex-auto flex-col">
                    <p className="text-gray-800">Order Total</p>
                    <p>{total}</p>
                </div>
                <div className='flex flex-auto flex-col'>
                        <p className='text-gray-800'>Order Id</p>
                        <p>{_id}</p>
                </div>
                <div className="flex flex-auto flex-col">
                    <Link to={`/account/orders/${_id}`} className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-md">View</Link>
                </div>

            </div>
            <div></div>
        </div>
    )
}

export default OrderCard;