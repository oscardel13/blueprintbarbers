const ProductCard = (props) => {
    const { product } = props;
    const onClickEvent = () => {
        window.location.href = `/store/${product.name}`;
    }
    return (
    <div className="w-full rounded-lg flex flex-col cursor-pointer hover:shadow-2xl hover:underline" onClick={onClickEvent}>
        <img src={product.images[0]} alt={product.name} className="max-h-64 object-cover"/>
        <div className="flex justify-between p-1 bg-gray-200">
            <div>
                <span className="text-md font-medium">{product.name}</span>
            </div>
            <div>
                <span className="text-sm font-medium">${product.pricing}.00</span>
            </div>
        </div>
    </div>
  )

}

export default ProductCard;