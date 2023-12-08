import { useState, useEffect } from "react";

import ProductItemDropdown from "../product-items-dropdown/product-items-dropdown.component";

const ProductItemsTable = ({itemsLoad, product}) => {
    const [ items, setItems ] = useState(itemsLoad);
    useEffect(() => {
        setItems(itemsLoad); 
    },[itemsLoad]) 
    return (
        <div className="flex overflow-auto bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 ">
            <div className='min-w-[1200px] w-[-webkit-fill-available]'>
                <div className='flex bg-gray-200 p-4 mb-0'>
                    <div className="w-2/6">Id</div>
                    <div className="w-2/6">Owner</div>
                    <div className="w-1/6">Size</div>
                    <div className="w-1/6">Status</div>
                    <div className="w-1/6">Actions</div>
                </div>
                {items.map((item, index) => (
                    <div className='flex items-center bg-white py-4 mb-0 border border-gray-300 rounded-md h-32' key={index}>
                        <div className="w-2/6 pl-5">{item._id}</div>
                        <div className="w-2/6">{item.owner ? item.owner : "N/A"}</div>
                        <div className="w-1/6">{item.size}</div>
                        <div className="w-1/6">{item.status}</div>
                        {/* TODO: make component that has dropdown one to change status and one to copy link */}
                        <div className="w-1/6">
                            <ProductItemDropdown key={item._id} item={item} product={product} setItems={setItems}/>
                        </div>
                    </div>
                ))}
            </div>        
        </div>
    )
}

export default ProductItemsTable;