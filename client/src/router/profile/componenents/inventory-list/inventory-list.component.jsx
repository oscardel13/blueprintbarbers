import { useState, useEffect } from "react";
import { getAPI } from "../../../../utils/api";
import { Link } from "react-router-dom";

const InventoryList = ({ items }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const productData = []
            for (let i = 0; i < items.length; i++) {
                const { product, item } = items[i];   
                const response = await getAPI(`/products/${product}/${item}`)
                productData.push(response.data)
            }
            setProducts(productData);
        }
        fetchItems()
    }, [items]);

    return (
        <div className="flex overflow-auto bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className='min-w-[1200px] w-[-webkit-fill-available]'>
                <div className='flex bg-gray-200 p-4 mb-0'>
                    <div className="w-2/6">Product</div>
                    <div className="w-2/6">Item Id</div>
                    <div className="w-1/6">Size</div>
                    <div className="w-1/6">Actions</div>
                </div>
                {products.map(({product, item}, index) => (
                    <div className='flex items-center bg-white py-4 mb-0 border border-gray-300 rounded-md h-32' key={index}>
                        <div className="w-2/6 pl-5 flex flex-row">
                            <img src={product.images[0]} className="h-28"/>
                            <h5 className="flex justify-center items-center">{product.name}</h5>
                        </div>
                        <div className="w-2/6">{item._id}</div>
                        <div className="w-1/6">{item.size}</div>
                        <div className="w-1/6">
                            <Link to={`/store/${product.name}/${item._id}`} className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md">View</Link>
                        </div>
                    </div>
                ))}
            </div>        
        </div>
    )
}

export default InventoryList;