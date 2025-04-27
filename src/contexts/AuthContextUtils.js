import { getRedirectPath } from "@/utils/auth.utils";

/**
 * Handle user login
 * @param {Function} setLoading - State setter for loading
 * @param {Function} setError - State setter for error
 * @param {Function} setUser - State setter for user
 * @param {Function} navigate - React Router navigate function
 * @param {Object} authAPI - Authentication API object
 * @param {Object} credentials - Login credentials
 * @returns {Promise<Object>} - Login response
 */
export const handleLogin = async (
  setLoading,
  setError,
  setUser,
  navigate,
  authAPI,
  credentials
) => {
  try {
    setLoading(true);
    setError(null);
    const { data } = await authAPI.login(credentials);

    // Save user to state and localStorage
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);

    // Redirect based on role
    const redirectPath = getRedirectPath();
    navigate(redirectPath);

    return data;
  } catch (err) {
    setError(err.response?.data?.message || "An error occurred during login");
    throw err;
  } finally {
    setLoading(false);
  }
};

/**
 * Handle user registration
 * @param {Function} setLoading - State setter for loading
 * @param {Function} setError - State setter for error
 * @param {Function} setUser - State setter for user
 * @param {Function} navigate - React Router navigate function
 * @param {Object} authAPI - Authentication API object
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - Registration response
 */
export const handleRegister = async (
  setLoading,
  setError,
  setUser,
  navigate,
  authAPI,
  userData
) => {
  try {
    setLoading(true);
    setError(null);
    const { data } = await authAPI.register(userData);

    // Save user to state and localStorage
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);

    // Redirect based on role (typically will be regular user for new registrations)
    const redirectPath = getRedirectPath();
    navigate(redirectPath);

    return data;
  } catch (err) {
    setError(
      err.response?.data?.message || "An error occurred during registration"
    );
    throw err;
  } finally {
    setLoading(false);
  }
};

/**
 * Handle user logout
 * @param {Function} setUser - State setter for user
 * @param {Function} navigate - React Router navigate function
 */
export const handleLogout = (setUser, navigate) => {
  // Remove user from state and localStorage
  setUser(null);
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  // Redirect to clone site after logout
  navigate("/admin/clone-site");
};

/**
 * Handle user profile update
 * @param {Function} setLoading - State setter for loading
 * @param {Function} setError - State setter for error
 * @param {Object} user - Current user object
 * @param {Function} setUser - State setter for user
 * @param {Object} authAPI - Authentication API object
 * @param {Object} userData - User profile update data
 * @returns {Promise<Object>} - Profile update response
 */
export const handleUpdateProfile = async (
  setLoading,
  setError,
  user,
  setUser,
  authAPI,
  userData
) => {
  try {
    setLoading(true);
    setError(null);
    const { data } = await authAPI.updateUserProfile(userData);

    // Update user in state and localStorage
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    return data;
  } catch (err) {
    setError(
      err.response?.data?.message || "An error occurred while updating profile"
    );
    throw err;
  } finally {
    setLoading(false);
  }
};
