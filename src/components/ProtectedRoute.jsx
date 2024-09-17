/* eslint-disable react/prop-types */
// components/ProtectedRoute.js

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = Boolean(localStorage.getItem("authToken"));



  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
