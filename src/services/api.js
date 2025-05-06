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

export const createUser = (props)=>{
    const urlBackend = "/api/v1/users";
    return axios.post(urlBackend, props);
}

export const updateUser = (id, props) => {
    const urlBackend = `/api/v1/users/updateUser/${id}`;
    return axios.put(urlBackend, props);
};



