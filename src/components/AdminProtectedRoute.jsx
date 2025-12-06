import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const adminLoggedIn = localStorage.getItem("adminLoggedIn");

  return adminLoggedIn ? children : <Navigate to="/admin-login" replace />;
}
