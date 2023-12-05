
const ItemCard = ({ item }) => {
    return (
        <div className="flex flex-row space-x-5">
            <img src={item.image} className="h-32 w-24 rounded-lg object-cover" alt="item image" style={{objectFit: 'cover'}} />
            <div className="flex flex-col justify-center">
                <a href={`/store/${item.name}`} className="font-black text-lg underline">{item.name}</a>
                <p className="">x{item.quantity}</p>

                <h3 className="hidden font-semibold text-md sm:block">Product Id:</h3>
                <p className="hidden sm:block">{item.product}</p>
            </div>
            <div className="flex flex-col justify-center">
                <h2>${item.pricing}</h2>
            </div>
        </div>
    )
}

export default ItemCard;