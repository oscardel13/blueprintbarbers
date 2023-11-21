import { useEffect, useState } from 'react';
import ProductCard from '../product_card/product_card.component';

import { products as productsHolder } from './product_list_holder.data'
import { getAPI } from '../../../../utils/api';

const ProductList = () => {
    const [products, setProducts] = useState(productsHolder);
    useEffect(()=>{
        const fetchProducts = async () => {
            try{
                const response = await getAPI("/products")
                setProducts(response.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchProducts()
    },[])
    return (
        <div className="pt-14 flex flex-col items-center">
            <h2 className="text-2xl font-medium">New Goods</h2>
            <div className="py-5 px-4 grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
                {
                    products.map(product => (
                        <ProductCard product={product} key={product._id}/>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductList