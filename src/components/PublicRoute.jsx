/* eslint-disable react/prop-types */
// components/PublicRoute.js

import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element }) => {
  const isLoggedIn = Boolean(localStorage.getItem('authToken')); // Check if token exists
  
  return isLoggedIn ? <Navigate to="/app" /> : element;
};

export default PublicRoute;
