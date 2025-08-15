import createInstanceAxios from "@/services/axios.customize";
import type {
  ILoginResponseData,
  ILoginRequest,
  IRegisterRequest,
  IRegisterResponseData,
} from "@/types/auth";
import type { IJobListResponse } from "@/types/job";
import type { IUploadResponse } from "@/types/upload";
import type {
  ICompanyListResponse,
  ICompanyDetailResponse,
} from "@/types/company";

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

export const getCompanyById = (id: string) => {
  const urlBackend = `/api/v1/companies/${id}`;
  return axios.get<IBackendRes<ICompanyDetailResponse>>(urlBackend);
};

export const upload = (companyId: string | null, file: File) => {
  const urlBackend = "/api/v1/files/upload";
  const formData = new FormData();

  const isPdf = file.type === "application/pdf";

  if (isPdf) {
    if (!companyId) {
      throw new Error("companyId is required for PDF files");
    }
    formData.append("companyId", companyId);
  }

  formData.append("file", file);

  return axios.post<IBackendRes<IUploadResponse>>(urlBackend, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-file-type": isPdf ? "pdf" : "image",
    },
  });
};
