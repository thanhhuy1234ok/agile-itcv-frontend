import axios from "axios";

const createInstanceAxios = (baseURL) => {
    const instance = axios.create({
        baseURL: baseURL,
        withCredentials: true
    });

    // Add a request interceptor
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem("access_token");
        const auth = token ? `Bearer ${token}` : '';
        config.headers["Authorization"] = auth;

        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    // Add a response interceptor
    instance.interceptors.response.use(function (response) {
        if (response && response.data) {
            return response.data;
        }
        return response;
    }, function (error) {
        if (error && error.response && error.response.data) {
            return error.response.data;
        }
        return Promise.reject(error);
    });

    return instance;
}

export default createInstanceAxios;
