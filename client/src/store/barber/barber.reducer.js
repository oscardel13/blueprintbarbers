import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentBarber: null,
  lastClient: null,
  lastBooking: null,
};

export const barberSlice = createSlice({
  name: "barber",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentBarber(state, action) {
      state.currentBarber = action.payload;
    },
    setLastClient(state, action) {
      state.lastClient = action.payload;
    },
    setLastBooking(state, action) {
      state.lastBooking = action.payload;
    },
  },
});

export const { setCurrentBarber, toggleSignIn, setLastClient, setLastBooking } =
  barberSlice.actions;
export const barberReducer = barberSlice.reducer;
