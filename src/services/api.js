import createInstanceAxios from './axios.customer';

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL)

export const login = (props) => {
    const urlBackend = "/api/v1/auth/login";
    return axios.post(urlBackend, props);
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

export const getUserDetail = (id) => {
    const urlBackend = `/api/v1/users/userDetail/${id}`;
    return axios.get(urlBackend);
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

export const createJob = (props) => {
    const urlBackend = `/api/v1/jobs`;
    return axios.post(urlBackend, props);
};

export const updateJob = (id, props) => {
    const urlBackend = `/api/v1/jobs/${id}`;
    return axios.put(urlBackend, props);
}

export const getJobsDetail = (id) => {
    const urlBackend = `/api/v1/jobs/${id}`;
    return axios.get(urlBackend);
};

export const createCompany = (props) => {
    const urlBackend = `/api/v1/companies`;
    return axios.post(urlBackend, props);
};

export const updateCompany = (id, props) => {
    const urlBackend = `/api/v1/companies/${id}`;
    return axios.put(urlBackend, props);
};

export const getJobsByCompanyId = (queryParams)=>{
    const urlBackend = `/api/v1/jobs`;
    return axios.get(urlBackend, { params: queryParams });
}

export const getAllResumes = (queryParams) => {
    const urlBackend = `/api/v1/resumes`;
    return axios.get(urlBackend, { params: queryParams });
};

export const updateStatusResume = (id, props) => {
    const urlBackend = `/api/v1/resumes/${id}`;
    return axios.put(urlBackend, props);
};

export const uploadImage = (file) => {
  const urlBackend = "/api/v1/files/upload";
  const formData = new FormData();
  formData.append('file', file);

  return axios.post(urlBackend, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-file-type': 'image',
    },
  });
};







