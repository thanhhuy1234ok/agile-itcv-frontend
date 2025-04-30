/**
 * Check if the user is authenticated
 * @returns {boolean} True if the user is authenticated
 */
export const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("access_token");
  return !!user && !!token;
};

/**
 * Get the current user from localStorage
 * @returns {Object|null} The user object or null if not authenticated
 */
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

/**
 * Check if the user has the specified role
 * @param {string} role - The role to check
 * @returns {boolean} True if the user has the specified role
 */
export const hasRole = (role) => {
  const user = getCurrentUser();
  return user && user.role === role;
};

/**
 * Check if the user has dev role
 * @returns {boolean} True if the user has dev role
 */
export const isDevRole = () => {
  return hasRole("dev");
};

/**
 * Check if the user has admin role
 * @returns {boolean} True if the user has admin role
 */
export const isAdminRole = () => {
  return hasRole("admin");
};

/**
 * Get the appropriate redirect path based on user role
 * @returns {string} The path to redirect to
 */
export const getRedirectPath = () => {
  if (!isAuthenticated()) {
    return "/login"; // Default for unauthenticated users
  }

  if (isDevRole()) {
    return "/"; // Home page for developers
  } else if (isAdminRole()) {
    return "/admin/home"; // Admin panel for admins
  } else {
    return "/user/clone-site"; // Clone site for regular users
  }
};
