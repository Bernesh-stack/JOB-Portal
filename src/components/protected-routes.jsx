// src/components/protected-routes.jsx
import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn, user} = useUser();
  const { pathname } = useLocation();


  if (!isLoaded) return null;

  if (isLoaded && !isSignedIn) {
    return <Navigate to={`/?sign-in=true`} replace />;
  }

if(user!==undefined && !user.unsafeMetadata.role&& pathname !== '/onboarding'){
  return <Navigate to="/onboarding" replace />;
}


  // signed in -> render protected childre
  return <>{children}</>;
};

export default ProtectedRoute;
