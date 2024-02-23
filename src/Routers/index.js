import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import SignInPage from "../pages/SignInPage";

import List from "../pages/List";
import Sessions from "../pages/Sessions";
import IconsPreview from "../components/icons/IconsPreview";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";

const RootRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignInPage />} />
      {/* <Route path="/sign-up" element={<SignUpPage />} /> */}
      <Route element={<PrivateRoute permissions={["ROLE_ADMIN"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route element={<PrivateRoute permissions={["ROLE_ADMIN"]} />}>
        <Route path="/list" element={<List />} />
      </Route>
      <Route element={<PrivateRoute permissions={["ROLE_ADMIN"]} />}>
        <Route path="/sessions" element={<Sessions />} />
      </Route>
      <Route path="/icons-preview" element={<IconsPreview />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RootRouter;
