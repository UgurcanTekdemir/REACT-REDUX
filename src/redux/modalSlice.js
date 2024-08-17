import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalToggle: (state) => {
      state.modal = !state.modal;
    },
  },
});

export const { modalToggle } = modalSlice.actions;

export default modalSlice.reducer;
