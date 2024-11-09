const testProduct = {
  name: "test product",
  pricing: 100,
  images: ["https://i.ibb.co/bPmVXyP/black-converse.png"],
  description: "test description",
};

const ProductCard = (props) => {
  let { product } = props;
  if (!product) {
    product = testProduct;
  }
  const onClickEvent = () => {
    window.location.href = `/store/${product.name}`;
  };
  return (
    <div
      className="w-full flex flex-col cursor-pointer hover:shadow-2xl hover:underline"
      onClick={onClickEvent}
    >
      <img
        src={product.images[0]}
        alt={product.name}
        className="sm:h-80 object-cover"
      />
      <div className="flex justify-between p-1 bg-gray-200">
        <div>
          <span className="font-medium">{product.name}</span>
        </div>
        <div>
          <span className="font-medium">${product.pricing}.00</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
