import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getAPI } from '../../../../utils/api';


import PageHeader from '../../compoenents/page-header/page-header.component';
import ProductView from '../../../../components/product-view/product-view.component';
import ProductItemsTable from '../../compoenents/product-items-table/product-items-table.component';

const productHolder = {
    name: '',
    description: '',
    pricing: 0,
    images: ['https://blue-print-static.s3.amazonaws.com/product_defult.jpg'],
    category: '',
    sizes: [],
    size: '',
    items: []
  }

const ViewProduct = () => {
    const { productName } = useParams();
    const [product, setProduct] = useState(productHolder)

    useEffect(() => {
        const fetchProduct = async () => {
        try{
            const response = await getAPI(`/products/${productName}`)
            console.log(response.data)
            setProduct(response.data)
        }
        catch(err){
            console.log(err)
        }
        }
        fetchProduct()
    },[])

    return (
        <div className="container">
            <PageHeader title="View Product">
                <Link className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded" to={`/dashboard/products/${productName}/edit`}>Edit</Link>
            </PageHeader>
            <div className="p-3 bg-white rounded-md">         
                <ProductView product={product} setProduct={setProduct}/>
            </div>
            <br/>
            <div className="p-3 bg-white rounded-md">
                <ProductItemsTable itemsLoad={product.items} product={product}/>
            </div>
        </div>
    );
};

export default ViewProduct;
