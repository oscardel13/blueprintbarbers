import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentUser: null,
  showSignInPopover: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    }, // anothe way to write setCurrentUser: () => {}
    toggleSignIn(state, action) {
      state.showSignInPopover = !state.showSignInPopover;
    }, // anothe way to write setCurrentUser: () => {}
  },
});

export const { setCurrentUser, toggleSignIn } = userSlice.actions;
export const userReducer = userSlice.reducer;
