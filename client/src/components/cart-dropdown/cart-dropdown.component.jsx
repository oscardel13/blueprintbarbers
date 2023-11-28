import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.reducer';

import {CartDropdownContainer, CartItemStyle, EmptyMessage} from './cart-dropdown.styles';


const CartDropdown = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const navigate = useNavigate()

    const goToCartHandler = useCallback(() =>{
        dispatch(setIsCartOpen());
        navigate('/cart');
    },[]);
    
    return (
        <CartDropdownContainer>
            <CartItemStyle>
                { cartItems.length ? (
                    cartItems.map((item)=>
                    <CartItem key={item._id} item={item} />
                    )) : (
                        <EmptyMessage>Your Cart Is Empty</EmptyMessage>
                )}
            </CartItemStyle>
            <button onClick={goToCartHandler} className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md">GO TO CART</button>
        </CartDropdownContainer>
    )
};  

export default CartDropdown;