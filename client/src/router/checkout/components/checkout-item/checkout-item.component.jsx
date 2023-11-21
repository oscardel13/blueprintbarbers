import { useDispatch } from 'react-redux';
import { useNavigate  } from "react-router-dom";
import { clearItemFromCart, removeItemFromCart, addItemToCart } from '../../../../store/cart/cart.reducer';


const CheckoutItem = ({item}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemoveItem = () => {
        dispatch(removeItemFromCart(item));   
    }
    const handleAddItem = () => {
        dispatch(addItemToCart(item));
    }
    const handleClearItem = () => {
        dispatch(clearItemFromCart(item));
    }
    const handleNameClick = (e) => {
        navigate(`/store/${item.name}`)
    }

    return (
        <div className={`grid grid-cols-2 md:grid-cols-4 border-b border-gray-300 py-2`} key={item.id}>
            <div className='p-1 flex'>
                <img src={item.images[0]} alt={item.name} className="w-20" />
                <div className="p-5 text-center flex flex-col gap-2">
                    <a className="text-md font-semibold cursor-pointer underline" onClick={handleNameClick}>{item.name}</a>
                    <p className="text-sm ">Size: {item.size}</p>
                    <button className="text-sm text-red-500" onClick={handleClearItem}>Remove</button>
                </div>
                
            </div>
            <div className="text-center items-center justify-center hidden md:flex">${item.pricing.toFixed(2)}</div>
            <div className="text-center items-center justify-center hidden md:flex"> 
                <a className='cursor-pointer text-xl font-semibold' onClick={handleRemoveItem}> {"-"}  &nbsp; </a>
                {item.quantity}
                <a className='cursor-pointer text-xl font-medium' onClick={handleAddItem}> &nbsp; {"+"} </a>
            </div>
            <div className="text-center items-center justify-center hidden md:flex">${(item.pricing * item.quantity).toFixed(2)}</div>

            <div className="flex flex-col items-center justify-center md:hidden">
                <div className="flex text-center items-center justify-center">${item.pricing.toFixed(2)}</div>
                <div className="flex text-center items-center justify-center"> 
                    <a className='cursor-pointer text-xl font-semibold' onClick={handleRemoveItem}> {"-"}  &nbsp; </a>
                    {item.quantity}
                    <a className='cursor-pointer text-xl font-medium' onClick={handleAddItem}> &nbsp; {" +"} </a>
                </div>
            </div>            
        </div>
    )
}

export default CheckoutItem;