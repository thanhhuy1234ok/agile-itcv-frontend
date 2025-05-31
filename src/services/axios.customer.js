import axios from "axios";

const createInstanceAxios = (baseURL) => {
    const instance = axios.create({
        baseURL: baseURL,
        withCredentials: true 
    });

    instance.interceptors.request.use(config => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    }, error => Promise.reject(error));

    instance.interceptors.response.use(
        response => response?.data || response,
        async error => {
            const originalRequest = error.config;

            // Nếu token hết hạn và chưa retry
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const res = await axios.get(
                        "http://localhost:8080/api/v1/auth/refresh-token",
                        { withCredentials: true }
                    );

                    const newAccessToken = res.data?.data?.access_Token;
                    if (newAccessToken) {
                        localStorage.setItem("access_token", newAccessToken);
                        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                        return instance(originalRequest); // Gửi lại request cũ
                    }
                } catch (refreshError) {
                    console.error("Refresh token thất bại:", refreshError);
                    localStorage.removeItem("access_token");
                }
            }

            // Trả về lỗi để .catch ở phía gọi xử lý
            return Promise.reject(error.response?.data || error);
        }
    );
    

    return instance;
};

export default createInstanceAxios;
