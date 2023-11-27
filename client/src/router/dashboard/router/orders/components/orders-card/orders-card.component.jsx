// ProductCard.js
import { Link } from 'react-router-dom';

const OrderCard = ({ _id, total, date, status, client }) => {
    // TODO GET PULL CLIENT DATA
    return (
        <div className="flex items-center bg-white py-4 mb-0 border border-gray-300 rounded-md h-32">
            <div className="w-1/6 pl-4">
                {new Date(date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })}
            </div>
            <div className="w-1/6">{client}</div>
            <div className="w-2/6">{_id}</div>
            <div className="w-1/6">${total}.00</div>
            {/* {published ? 
                <div className="w-1/6"><span className='bg-[rgba(16,185,129,0.12)] text-[rgb(11,129,90)] text-bold rounded-full font-semibold p-2'>PUBLISHED</span></div> 
                : 
                <div className="w-1/6"><span className='bg-[rgba(6,174,212,0.12)] text-[rgb(14,112,135)] text-bold rounded-full font-semibold p-2'>DRAFT</span></div>
            } */}
            <div className="w-1/6">{status}</div>
            <div className="w-1/6">
            {/* Make first part of path get path router route */}
                <Link to={`/dashboard/orders/${_id}`} className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-md">View</Link>
            </div>
        </div>
    );
}

export default OrderCard;
