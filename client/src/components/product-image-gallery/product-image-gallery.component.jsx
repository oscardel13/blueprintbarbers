// ImageGallery.js
import React from 'react';

const ImageGallery = ({ images, currentImageIndex, handleImageChange, handleNextImage, handlePrevImage }) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={images[currentImageIndex]}
        alt="product image"
        className="scale-100 max-h-[40rem] object-cover rounded-lg shadow-md mb-2 border border-gray-300"
      />
      <br/>
      <div className="flex overflow-auto">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="product image"
            className={`cursor-pointer mx-2 border border-gray-300 max-h-16 ${
              currentImageIndex === index && 'border-blue-500'
            }`}
            onClick={() => handleImageChange(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
