import { createSlice } from "@reduxjs/toolkit";
import { get } from "lockr";

const initialState = {
  isSession: get("isSession") || false,
  isGame: false,
  currentAttempt: get("currentAttempt") || null,
  gameData: get("gameData") || null,
  isWon: get("isWon") || null,
  sessionsCount: get("sessionsCount") || 0,
  officeUser: get("officeUser") || null,
  attemptsLimit: 700,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setIsSession: (state, { payload }) => {
      state.isSession = payload;
    },
    setGameData: (state, { payload }) => {
      state.gameData = payload;
    },
    setCurrentAttempt: (state, { payload }) => {
      state.currentAttempt = payload;
    },
    setIsWon: (state, { payload }) => {
      state.isWon = payload;
    },
    setSessionsCount: (state, { payload }) => {
      state.sessionsCount = payload;
    },
    setOfficeUser: (state, { payload }) => {
      state.officeUser = payload;
    },
  },
});

export const actions = {
  ...dataSlice.actions,
};

export default dataSlice.reducer;
