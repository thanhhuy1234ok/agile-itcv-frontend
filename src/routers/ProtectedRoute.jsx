import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/global/AuthenticationContext';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && user?.role?.name !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
