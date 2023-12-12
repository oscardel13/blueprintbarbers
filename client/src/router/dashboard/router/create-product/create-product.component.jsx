import React, { useState } from 'react';

import PageHeader from '../../compoenents/page-header/page-header.component';

import { postAPIMultipart } from '../../../../utils/api';
import DragAndDrop from '../../compoenents/drag-and-drop/drag-and-drop.component';

const CreateProductPage = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    images: [],
    pricing: '',
    category: '',
    sizes: {
      Small: 0,
      Medium: 0,
      Large: 0,
      "Extra-Large": 0,
      "One Size Fits All": 0
    },
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductData((prevData) => ({ ...prevData, images: files }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setProductData((prevData) => ({ ...prevData, category: value }));
  };

  const handleSizeChange = (size, quantity) => {
    setProductData((prevData) => ({
      ...prevData,
      sizes: {
        ...prevData.sizes,
        [size]: isNaN(quantity) ? 0 : quantity,
      },
    }));
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
        return;
    }

    const items = Array.from(productData.images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items)
    setProductData({...productData, images: items});
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productFormData = new FormData();
    productFormData.append('form', JSON.stringify(productData))
    productData.images.forEach((image) => {
      productFormData.append('images', image);
    })
    
    try{
      const res = await postAPIMultipart('/products',productFormData)
      console.log(res)
      if (res.status === 200)
        window.location.href = '/dashboard/products';
      else{
        window.alert("Product not created")
      }
    }
    catch(err){
      window.alert("Product not created")
      console.log(err)
    }
  };

  return (
    <div className="container">
      <PageHeader title="Create Product" />
    
      <div className="max-w-4xl mx-auto bg-white p-8 border rounded-md shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Name:</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <small className='text-gray-500'>Name must be unique!</small>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Description:</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <DragAndDrop onDragEnd={onDragEnd} images={productData.images}/>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Images:</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Pricing:</label>
            <input
              type="text"
              name="pricing"
              value={productData.pricing}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Category:</label>
            <select
              name="category"
              value={productData.category}
              onChange={handleCategoryChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              <option value="">Select Category</option>
              <option value="Hats">Hats</option>
              <option value="Shirts">Shirts</option>
              <option value="Hoodies">Hoodies</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Sizes:</label>
            <div className="flex space-x-2 flex-col lg:flex-row space-y-3 lg:space-y-0">
              {Object.entries(productData.sizes).map(([size, quantity]) => (
                <div key={size} className="flex items-center">
                  <label className="mr-2 text-gray-700">{size}:</label>
                  <input
                    type="number"
                    name={`sizes.${size}`}
                    value={quantity}
                    onChange={(e) => handleSizeChange(size, parseInt(e.target.value, 10))}
                    className="p-2 w-[70px] border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
              ))}
            </div>
          </div>
          <br/>
          <br/>
          <button
            type="submit"
            className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 h-12 min-w-[18rem]"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;
