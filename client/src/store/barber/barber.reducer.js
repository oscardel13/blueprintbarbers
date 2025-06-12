import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentBarber: null,
};

export const barberSlice = createSlice({
  name: "barber",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentBarber(state, action) {
      state.currentBarber = action.payload;
    },
  },
});

export const { setCurrentBarber } = barberSlice.actions;
export const barberReducer = barberSlice.reducer;
