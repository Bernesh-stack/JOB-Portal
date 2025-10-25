// src/components/protected-routes.jsx
import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();
  const { pathname } = useLocation();


  if (!isLoaded) return null;

  if (isLoaded && !isSignedIn) {
    return <Navigate to={`/?sign-in=true`} replace />;
  }

  // signed in -> render protected childre
  return <>{children}</>;
};

export default ProtectedRoute;
