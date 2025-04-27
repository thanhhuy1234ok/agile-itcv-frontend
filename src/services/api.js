import axios from "axios";

// Create axios instance with your backend URL
const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api/v1",
  withCredentials: true, // Important for cookies (refresh token)
});

// Add request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call the refresh token endpoint
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api/v1"
          }/auth/refresh-token`,
          {
            withCredentials: true, // Important for accessing the refresh token cookie
          }
        );

        // If token refresh was successful
        if (response.data.code === 1) {
          // Update the access token in localStorage
          localStorage.setItem("access_token", response.data.access_Token);

          // Update the Authorization header for the original request
          originalRequest.headers.Authorization = `Bearer ${response.data.access_Token}`;

          // Retry the original request
          return API(originalRequest);
        }
        return Promise.reject(error);
      } catch (refreshError) {
        // If refresh token is invalid, redirect to login
        console.error("Error refreshing token:", refreshError);
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Admin API
export const getAdminStats = async () => {
  // Mock implementation for development
  return {
    code: 1,
    data: {
      totalUsers: 125,
      totalSites: 42,
      activeSites: 38,
      totalSettings: 15,
    },
  };
};

export const getUsers = async () => {
  // Mock implementation for development
  return {
    code: 1,
    data: [
      {
        id: 1,
        name: "Admin User",
        email: "admin@example.com",
        phone: "0123456789",
        role: "admin",
        status: true,
      },
      {
        id: 2,
        name: "Developer User",
        email: "dev@example.com",
        phone: "0987654321",
        role: "dev",
        status: true,
      },
      {
        id: 3,
        name: "Regular User",
        email: "user@example.com",
        phone: "0987654321",
        role: "user",
        status: true,
      },
    ],
  };
};

export const getSettings = async () => {
  // Mock implementation for development
  return {
    code: 1,
    data: [
      {
        id: 1,
        name: "Site Name",
        value: "Agile System",
        description: "The name of the application",
      },
      {
        id: 2,
        name: "Maintenance Mode",
        value: "false",
        description: "Enable/disable maintenance mode",
      },
      {
        id: 3,
        name: "Default Language",
        value: "vi",
        description: "Default language for the application",
      },
    ],
  };
};

export const updateSystemSetting = async (id, value) => {
  // Mock implementation for development
  return {
    code: 1,
    message: "Setting updated successfully",
    data: { id, value },
  };
};

export const login = async (credentials) => {
  // Mock implementation for role-based authentication
  if (
    credentials.email === "admin@example.com" &&
    credentials.password === "admin123"
  ) {
    return {
      code: 1,
      data: {
        id: 1,
        name: "Admin User",
        email: "admin@example.com",
        role: "admin", // Admin role
      },
      access_Token: "mock-jwt-token-admin-" + Date.now(),
      message: "Login successful",
    };
  } else if (
    credentials.email === "dev@example.com" &&
    credentials.password === "dev123"
  ) {
    return {
      code: 1,
      data: {
        id: 2,
        name: "Developer User",
        email: "dev@example.com",
        role: "dev", // Developer role
      },
      access_Token: "mock-jwt-token-dev-" + Date.now(),
      message: "Login successful",
    };
  } else if (
    credentials.email === "user@example.com" &&
    credentials.password === "user123"
  ) {
    return {
      code: 1,
      data: {
        id: 3,
        name: "Regular User",
        email: "user@example.com",
        role: "user", // Regular user role
      },
      access_Token: "mock-jwt-token-user-" + Date.now(),
      message: "Login successful",
    };
  }

  return {
    code: 0,
    message: "Invalid email or password",
  };
};

export const register = async (userData) => {
  // Mock implementation for development
  return {
    code: 1,
    message: "Registration successful",
    data: {
      id: 3,
      name: userData.name,
      email: userData.email,
      role: "user", // Default role for newly registered users
    },
    access_Token: "mock-jwt-token-" + Date.now(),
  };
};

// Auth API
export const authAPI = {
  register: (userData) => register(userData),
  login: (credentials) => login(credentials),
  refreshToken: () => API.get("/auth/refresh-token"),
};

// User API
export const userAPI = {
  getAllUsers: () => API.get("/users"),
  getUserById: (id) => API.get(`/users/${id}`),
  updateUser: (id, userData) => API.put(`/users/${id}`, userData),
  deleteUser: (id) => API.delete(`/users/${id}`),
};

// Export all APIs
export default {
  auth: authAPI,
  users: userAPI,
};
