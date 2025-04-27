import { Navigate } from "react-router-dom";
import { isAuthenticated, hasRole, getRedirectPath } from "@/utils/auth.utils";

/**
 * Protected route component that checks authentication and role requirements
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authorized
 * @param {string|null} props.requiredRole - Optional role requirement
 * @returns {React.ReactNode} - The protected component or redirect
 */
export const ProtectedRoute = ({ children, requiredRole = null }) => {
  // First check if user is authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Then check if role is required and if user has that role
  if (requiredRole && !hasRole(requiredRole)) {
    // Redirect to appropriate page based on role
    return <Navigate to={getRedirectPath()} replace />;
  }

  return children;
};

/**
 * Default route component that redirects based on authentication status and role
 * @returns {React.ReactNode} - Navigate component to the appropriate path
 */
export const DefaultRoute = () => {
  return <Navigate to={getRedirectPath()} replace />;
};
