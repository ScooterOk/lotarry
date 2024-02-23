import { configureStore } from "@reduxjs/toolkit";
import data from "../core/services/data";
import dataApi from "../core/services/data/dataApi";
import { logoutNotifications } from "./middleware";

export const store = configureStore({
  reducer: {
    [dataApi.reducerPath]: dataApi.reducer,
    data,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(dataApi.middleware)
      .concat([logoutNotifications]),
});
