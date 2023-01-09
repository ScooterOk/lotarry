import { configureStore } from "@reduxjs/toolkit";
import data from "../core/services/data";

export const store = configureStore({
  reducer: {
    data,
  },
});
