import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentuser: null,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentuser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    updateSuccess: (state, action) => {
      (state.currentuser = action.payload), (state.loading = false);
      state.error = null;
    },
    updateFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    deleteUserStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    deleteUserSuccess: (state, action) => {
      (state.currentuser = null), (state.loading = false), (state.error = null);
    },
    deleteUserfailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    signOutSuccess: (state, action) => {
      (state.currentuser = null), (state.loading = false), (state.error = null);
    },
  },
});
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateFailure,
  updateStart,
  updateSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserfailure,
  signOutSuccess
} = userSlice.actions;
export default userSlice.reducer;
