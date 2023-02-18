import { createSlice } from "@reduxjs/toolkit";
import { get } from "lockr";

const initialState = {
  isSession: get("isSession") || false,
  isGame: false,
  currentUser: get("currentUser") || null,
  gameData: get("gameData") || null,
  isWon: get("isWon") || null,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setIsSession: (state, payload) => {
      state.isSession = payload;
    },
    setGameData: (state, { payload }) => {
      state.gameData = payload;
    },
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    setIsWon: (state, { payload }) => {
      state.isWon = payload;
    },
  },
});

export const actions = {
  ...dataSlice.actions,
};

export default dataSlice.reducer;
