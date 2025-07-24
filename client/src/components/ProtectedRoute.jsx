import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check for user info in local storage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // If user info (and a token) exists, allow access to the child routes (the Outlet).
  // Otherwise, redirect the user to the login page.
  return userInfo && userInfo.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace /> //replace prop is imp as it doesnt allow user to go back page
  );
};

export default ProtectedRoute;
