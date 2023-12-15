import { createSlice } from '@reduxjs/toolkit';

import { addCartItem, removeCartItem, clearCartItem } from './cart.helper';

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  orderId: ""
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    setIsCartOpen(state, action) {
      state.isCartOpen = !state.isCartOpen
    },
    addItemToCart(state, action) {
      state.cartItems = addCartItem(state.cartItems, action.payload)
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeCartItem(state.cartItems, action.payload)
    },
    clearItemFromCart(state, action) {
      state.cartItems = clearCartItem(state.cartItems, action.payload)
    },
    setOrderId(state, action) {
      state.orderId = action.payload;
    }
  }
})

export const { setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, setOrderId } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
