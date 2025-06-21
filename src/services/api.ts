import createInstanceAxios from "@/services/axios.customize";
import type { IBackendRes, ILoginResponseData, ILoginRequest } from "@/types/api";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const login = (data: ILoginRequest) => {
  const urlBackend = "/api/v1/auth/login";
  return axios.post<IBackendRes<ILoginResponseData>>(urlBackend, data);
};