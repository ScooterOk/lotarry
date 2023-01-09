import { createSlice } from "@reduxjs/toolkit";

const { REACT_APP_API_URL } = process.env;

const initialState = {
  isSession: false,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setIsSession: (state, payload) => {
      state.isSession = payload;
    },
  },
});

export const actions = {
  ...dataSlice.actions,
};

export default dataSlice.reducer;
