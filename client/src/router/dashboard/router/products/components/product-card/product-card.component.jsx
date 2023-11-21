// ProductCard.js
import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ProductCard = ({ _id, name, stock, pricing, images, published }) => {
    return (
        <div className="flex items-center bg-white py-4 mb-0 border border-gray-300 rounded-md h-32">
            <div className="flex w-2/6">
                <span className='flex items-center cursor-pointer justify-center px-3'><KeyboardArrowRightIcon/></span>
                <img
                    src={images[0]} // Replace with the actual path to your product images
                    alt={name}
                    className="w-24 h-28 object-cover rounded-md"
                />
                &nbsp;
                &nbsp;
                <div className='flex items-center cursor-pointer text-left'>{name}</div>
            </div>

            <div className="w-1/6">{stock} in stock</div>
            <div className="w-1/6">${pricing}.00</div>
            <div className="w-2/6">{_id}</div>
            {published ? 
                <div className="w-1/6"><span className='bg-[rgba(16,185,129,0.12)] text-[rgb(11,129,90)] text-bold rounded-full font-semibold p-2'>PUBLISHED</span></div> 
                : 
                <div className="w-1/6"><span className='bg-[rgba(6,174,212,0.12)] text-[rgb(14,112,135)] text-bold rounded-full font-semibold p-2'>DRAFT</span></div>}
            
            {/* Add actions or additional information here */}
            <div className="w-1/6">
            {/* Add your action buttons or other elements */}
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-md">Edit</button>
            {/* Add more action buttons as needed */}
            </div>
        </div>
    );
}

export default ProductCard;
