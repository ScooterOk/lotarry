import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
import RootRouter from "./Routers";
import { SnackbarUtilsConfigurator } from "./utils/SnackBarUtils";
import Notifications from "./components/Notifications";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <Notifications>
        <SnackbarUtilsConfigurator />
        <RootRouter />
      </Notifications>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
