import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  register: (userData) => api.post("/users/register", userData),
  login: (credentials) => api.post("/users/login", credentials),
  getUserProfile: () => api.get("/users/profile"),
  updateUserProfile: (userData) => api.put("/users/profile", userData),
};

// Jobs API
export const jobsAPI = {
  getJobs: (params) => api.get("/jobs", { params }),
  getJobById: (id) => api.get(`/jobs/${id}`),
  createJob: (jobData) => api.post("/jobs", jobData),
  updateJob: (id, jobData) => api.put(`/jobs/${id}`, jobData),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  applyForJob: (id, resumeUrl) => api.post(`/jobs/apply/${id}`, { resumeUrl }),
};

// Companies API
export const companiesAPI = {
  getCompanies: () => api.get("/companies"),
  getCompanyById: (id) => api.get(`/companies/${id}`),
  createCompany: (companyData) => api.post("/companies", companyData),
  updateCompany: (id, companyData) => api.put(`/companies/${id}`, companyData),
  deleteCompany: (id) => api.delete(`/companies/${id}`),
};

// Resumes API
export const resumesAPI = {
  getUserResumes: () => api.get("/resumes/user"),
  getResumeById: (id) => api.get(`/resumes/${id}`),
  uploadResume: (resumeData) => api.post("/resumes/upload", resumeData),
  updateResumeStatus: (id, status) =>
    api.put(`/resumes/${id}/status`, { status }),
  deleteResume: (id) => api.delete(`/resumes/${id}`),
};

export default {
  auth: authAPI,
  jobs: jobsAPI,
  companies: companiesAPI,
  resumes: resumesAPI,
};
