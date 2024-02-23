import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

const PrivateRoute = ({ permissions, children }) => {
  const { isUser } = useSelector((state) => state.data);
  const location = useLocation();

  if (!isUser) {
    return <Navigate to="/" state={{ path: location.pathname }} replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
