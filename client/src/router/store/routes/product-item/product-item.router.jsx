import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAPI } from '../../../../utils/api';


import ProductList from '../../components/product_list/product_list.component';
import ImageGallery from '../../../../components/product-image-gallery/product-image-gallery.component';

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

const ProductItemPage = () => {
    const { itemId } = useParams();
    const { productName } = useParams();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [product, setProduct] = useState(productHolder)
    const [item, setItem] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
        try{
            const response = await getAPI(`/products/${productName}/${itemId}`)
            console.log(response.data)
            setProduct(response.data.product)
            setItem(response.data.item)
        }
        catch(err){
            console.log(err)
        }
        }
        fetchProduct()
    },[])

    const handleImageChange = (index) => {
        setCurrentImageIndex(index);
    };
    if (item == null){
        return <div className='flex h-screen justify-center items-center'>
            <h1 className='font-bold text-5xl'>No item found</h1>
        </div>
    }
    return (
        <>
        <div className="my-custom-class flex px-5 sm:px-10 md:px-40 py-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex justify-center items-center">
            <ImageGallery
                images={product.images}
                currentImageIndex={currentImageIndex}
                handleImageChange={handleImageChange}
            />
            </div>
            <div className="flex justify-center grid grid-cols-1">
            <h2 className="text-lg font-medium">{product.name}</h2>
            <p>{product.description}</p>
            <h3>${product.pricing} USD</h3>
            <select className="bg-gray-200 p-2 rounded-md max-w-lg" disabled>
                <option value={item.size}>{item.size}</option>
            </select>
            <br />
            <h3>Owned by: &nbsp; 
                {
                    item.owner ? item.owner : "N/A"
                } 
            </h3>
            
            </div>
        </div>
        <ProductList/>
        </>
    );
};

export default ProductItemPage;
