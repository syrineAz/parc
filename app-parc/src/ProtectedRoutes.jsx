import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './Auth/AuthContexte.jsx';
const ProtectedRoutes = ({ element: Component, allowedRoles, redirectTo = '/' }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Component />;
};

export default ProtectedRoutes;
