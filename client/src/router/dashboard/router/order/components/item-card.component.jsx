
const ItemCard = ({ product }) => {
    console.log(product.items.length)
    return (
        <div className="flex flex-row space-x-5">
            <img src={product.image} className="h-32 w-24 rounded-lg object-cover" alt="product image" style={{objectFit: 'cover'}} />
            <div className="flex flex-col justify-center">
                <a href={`/store/${product.name}`} className="font-black text-lg underline">{product.name}</a>
                <p className="">x {product.items.length}</p>

                <h3 className="hidden font-semibold text-md sm:block">Product Id:</h3>
                <p className="hidden sm:block">{product.product}</p>
            </div>
            <div className="flex flex-col justify-center">
                <h2>${product.pricing}</h2>
            </div>
        </div>
    )
}

export default ItemCard;