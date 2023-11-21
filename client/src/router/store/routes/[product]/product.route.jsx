import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../components/product_list/product_list_holder.data';
import ProductList from '../../components/product_list/product_list.component';
import { addItemToCart } from '../../../../store/cart/cart.reducer';
import { useDispatch } from 'react-redux';
import { getAPI } from '../../../../utils/api';
import ImageGallery from '../../components/product-image-gallery/product-image-gallery.component';

const productHolder = {
  name: '',
  description: '',
  pricing: 0,
  images: [],
  category: '',
  sizes: [],
  size: ''
}

const ProductPage = () => {
  const dispatch = useDispatch();
  const { productName } = useParams();
  const [product, setProduct] = useState(productHolder)
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try{
        const response = await getAPI(`/products/${productName}`)
        setProduct(response.data)
      }
      catch(err){
        console.log(err)
      }
    }
    fetchProduct()
  },[])

  const handleSizeChange = (e) => {
    setProduct({...product, size: e.target.value})
  }

  const handleAddToCart = () => {
    if (product.size  && product.size  != ""){
      
      dispatch(addItemToCart(product));
      setShowAddedMessage(true);
    }
    else{
      window.alert("Please select a size")
    }
    
    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowAddedMessage(false);
    }, 3000);
  };

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="my-custom-class flex px-5 sm:px-10 md:px-40 py-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex justify-center items-center">
          <ImageGallery
            images={product.images}
            currentImageIndex={currentImageIndex}
            handleImageChange={handleImageChange}
            handleNextImage={handleNextImage}
            handlePrevImage={handlePrevImage}
          />
        </div>
        <div className="flex justify-center grid grid-cols-1">
          <h2 className="text-lg font-medium">{product.name}</h2>
          <p>{product.description}</p>
          <h3>${product.pricing} USD</h3>
          { product.sizes.length > 0 && 
          <select className="bg-gray-200 p-2 rounded-md max-w-lg" onChange={handleSizeChange}>
            <option value="">Select Size</option>
            {
              product.sizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))
            }
          </select>}
          <br />
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md max-w-lg"
            onClick={handleAddToCart}
          >
            {showAddedMessage ? (
            <div className="text-green-600">Added</div>
          ): "Add to Cart"
          }
          </button>
        </div>
      </div>
      <ProductList />
    </>
  );
};

export default ProductPage;
