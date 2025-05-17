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

export const register = (props) => {
    const urlBackend = "/api/v1/auth/register";
    return axios.post(urlBackend, props);
};

export const getAllUsers = (queryParams) => {
    const urlBackend = "/api/v1/users/allUsers";
    return axios.get(urlBackend, { params: queryParams });
};

export const getAllRoles = (queryParams) => {
    const urlBackend = "/api/v1/roles";
    return axios.get(urlBackend, { params: queryParams });
};

export const createUser = (props)=>{
    const urlBackend = "/api/v1/users";
    return axios.post(urlBackend, props);
}

export const updateUser = (id, props) => {
    const urlBackend = `/api/v1/users/updateUser/${id}`;
    return axios.put(urlBackend, props);
};

export const getAllCompanies = (queryParams) => {
    const urlBackend = `/api/v1/companies`;
    return axios.get(urlBackend, { params: queryParams });
};

export const getAllJobs = (queryParams) => {
    const urlBackend = `/api/v1/jobs`;
    return axios.get(urlBackend, { params: queryParams });
};



