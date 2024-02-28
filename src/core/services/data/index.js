import { createSlice } from "@reduxjs/toolkit";
import { get } from "lockr";

const initialState = {
  token: get("_lt") || undefined,
  isUser: get("_lu") || false,
  isSession: get("_ls") || false,
  isGame: false,
  currentAttempt: get("_lca") || null,
  isWon: get("_lw") || null,
  sessionsCount: get("_lsc") || 0,
  memberSelectsList: null,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setIsUser: (state, { payload }) => {
      state.isUser = payload;
    },
    setIsSession: (state, { payload }) => {
      state.isSession = payload;
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
    setMemberSelectsList: (state, { payload }) => {
      state.memberSelectsList = payload;
    },
  },
});

export const actions = {
  ...dataSlice.actions,
};

export default dataSlice.reducer;
