import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DragAndDrop from '../../compoenents/drag-and-drop/drag-and-drop.component';
import PageHeader from '../../compoenents/page-header/page-header.component';

import { deleteAPI, getAPI, putAPI, putAPIMultipart } from '../../../../utils/api';

const EditProduct = () => {
    const { productName } = useParams();
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
  
    useEffect(() => {
        const fetchProduct = async () => {
        try{
            const response = await getAPI(`/products/${productName}`)
            if (response.data)
                setProductData(response.data)
        }
        catch(err){
            console.log(err)
        }
        }
        fetchProduct()
    },[])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const updatedImages = [...productData.images, ...files]
        // updatedImages.push(files)
        setProductData((prevData) => ({ ...prevData, images: updatedImages }));
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

    const handleArchive = async () => {
        try{
            const res = await putAPI(`/products/archives/${productData.name}`)
            if (res.status === 200){
                window.location.reload();            }
            else
                window.alert("Product not archived")
        }
        catch(err){
            console.log(err)
            window.alert("Product not archived")
        }
    }

    const handlePublish = async () => {
        try{
            const res = await putAPI(`/products/publish/${productData.name}`)
            if (res.status === 200){
                window.location.reload();            }
            else
                window.alert("Product not published")
        }
        catch(err){
            console.log(err)
            window.alert("Product not archived")
        }
    }

    const handleDelete = async () => {
        //are you sure
        const sure = window.confirm("Are you sure you want to delete this product?")
        if (!sure) return
        try{
            const res = await deleteAPI(`/products/${productData._id}`)
            if (res.status === 200){
                window.location.href = '/dashboard/products';      
            }
            else
                window.alert("Product not deleted")
        }
        catch(err){
            console.log(err)
            window.alert("Product not deleted")
        }
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(productData.images);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setProductData({...productData, images: items});
    };

    // TODO: 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const productFormData = new FormData();
        
        productFormData.append('form', JSON.stringify(productData))

        productData.images.forEach((image) => {
            productFormData.append('images', image);
        })

        try{
            const res = await putAPIMultipart(`/products/${productName}`,productFormData)
            if (res.status === 200){
                window.alert("Product updated successfully")
            }
            else{
                window.alert("Product not updated")
        
            }
        }
        catch(err){
            console.log(err)
            window.alert("Product not updated")
        }
    };

    return (
        <div className="container">
        <PageHeader title="Edit Product" />
        
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
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Description:</label>
                <textarea
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Category:</label>
                <select
                name="category"
                value={productData.category}
                onChange={handleCategoryChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                <option value="">Select Category</option>
                <option value="Hats">Hats</option>
                <option value="Shirts">Shirts</option>
                <option value="Hoodies">Hoodies</option>
                {/* Add more options as needed */}
                </select>
            </div>

            {/* 
            // REMOVE UNTIL MAKE FUNCTIONALITY TO ADD MORE SIZES
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Add Sizes:</label>
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
            </div> */}
            <br/>
            <div className='grid grid-cols-2 gap-3'>
                <button type="submit" className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 h-12 col-span-2">
                    Edit Product
                </button>
                
                <span type="publish" onClick={handlePublish} className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 h-12 flex justify-center items-center">
                    {
                        productData.published ? "Unpublish" : "Publish"
                    }
                </span>
                <span type="archive" onClick={handleArchive} className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 h-12 flex justify-center items-center">
                    {
                        productData.archived ? "Unarchive" : "Archive" 
                    }
                </span>
                {
                    productData.archived ?
                        <span type="delete" onClick={handleDelete} className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 h-12 flex justify-center items-center col-span-2">Delete</span> 
                        :
                        null
                }
            </div>
            </form>
        </div>
        </div>
    );
};

export default EditProduct;
