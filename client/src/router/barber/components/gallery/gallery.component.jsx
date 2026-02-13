import { useState } from "react";

const Gallery = ({ images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const open = (index) => setActiveIndex(index);
  const close = () => setActiveIndex(null);

  const next = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold">Portfolio</h3>

      {/* Scrollable thumbnails */}
      <div className="flex flex-row flex-nowrap gap-4 mt-6 overflow-x-auto pb-4">
        {images.length > 0 ? (
          images.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`Gallery Image ${index + 1}`}
              className="w-72 h-72 object-cover rounded-lg shadow-md flex-shrink-0 cursor-pointer hover:opacity-90 transition"
              onClick={() => open(index)}
            />
          ))
        ) : (
          <p>No gallery images available</p>
        )}
      </div>

      {/* Lightbox overlay */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={close}
        >
          <div
            className="relative max-w-4xl w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute -top-10 right-4 text-white text-2xl font-bold"
            >
              ✕
            </button>

            {/* Main image */}
            <img
              src={images[activeIndex]}
              alt={`Expanded ${activeIndex + 1}`}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-3xl px-3"
                >
                  ‹
                </button>

                <button
                  onClick={next}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-3xl px-3"
                >
                  ›
                </button>
              </>
            )}

            {/* Small indicator */}
            <p className="text-center text-white mt-2 text-sm">
              {activeIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
