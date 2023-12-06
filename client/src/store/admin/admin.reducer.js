import { createSlice } from '@reduxjs/toolkit';

const ADMIN_MEM_INITIAL_STATE = {
  barber: null,
  user: null,
  product: null,
  order: {items: [], status:'pending'},
};

export const adminMemSlice = createSlice({
  name: "admin",
  initialState: ADMIN_MEM_INITIAL_STATE,
  reducers: {
    setBarber(state, action) {
      state.barber = action.payload
    },
    setUser(state, action) {
        state.user = action.payload
    },
    setProduct(state, action) {
        state.product = action.payload
    },
    setOrder(state, action) {
        state.order = action.payload
    }
  }
})

export const { setBarber, setUser, setProduct, setOrder } = adminMemSlice.actions;

export const adminMemReducer = adminMemSlice.reducer;
