import { combineReducers } from '@reduxjs/toolkit';

import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/category.reducer';
import { cartReducer } from './cart/cart.reducer';
import { adminMemReducer } from './admin/admin.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  // categories: categoriesReducer,
  cart: cartReducer,
  admin: adminMemReducer
});
