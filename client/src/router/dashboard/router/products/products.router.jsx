import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ProductCard from './components/product-card/product-card.component';
import PageHeader from '../../compoenents/page-header/page-header.component';

import { getAPI } from '../../../../utils/api';

const ProductsPage = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            try{
                const res = await getAPI('/products')
                setProducts(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        
        getProducts()

    },[])

    return (
        <div className="container">
            <PageHeader title={"Products"}>
                <Link className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded" to="/dashboard/products/create">Add</Link>
            </PageHeader>
            <div className="flex overflow-auto bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 ">
                <div className='min-w-[1200px] w-[-webkit-fill-available]'>
                    <div className='flex bg-gray-200 p-4 mb-0'>
                        <div className="w-2/6">Name</div>
                        <div className="w-1/6">Stock</div>
                        <div className="w-1/6">Price</div>
                        <div className="w-2/6">SKU</div>
                        <div className="w-1/6">Status</div>
                        <div className="w-1/6">Actions</div>
                    </div>
                    {products.map((product) => (
                    <ProductCard key={product._id} {...product} />
                    ))}
                </div>        
            </div>
            
        </div>
    )
};

export default ProductsPage;
