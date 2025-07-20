import createInstanceAxios from "@/services/axios.customize";
import type {
  ILoginResponseData,
  ILoginRequest,
  IRegisterRequest,
  IRegisterResponseData,
} from "@/types/auth";
import type { IJobListResponse } from "@/types/job";
import type { ICompanyListResponse } from "@/types/company";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const login = (data: ILoginRequest) => {
  const urlBackend = "/api/v1/auth/login";
  return axios.post<IBackendRes<ILoginResponseData>>(urlBackend, data);
};

export const register = (data: IRegisterRequest) => {
  const urlBackend = "/api/v1/auth/register";
  return axios.post<IBackendRes<IRegisterResponseData>>(urlBackend, data);
};

export const getJobs = (params?: Record<string, any>) => {
  const urlBackend = "/api/v1/jobs";
  return axios.get<IBackendRes<IJobListResponse>>(urlBackend, { params });
};

export const getCompany = (params?: Record<string, any>) => {
  const urlBackend = "/api/v1/companies";
  return axios.get<IBackendRes<ICompanyListResponse>>(urlBackend, { params });
};
