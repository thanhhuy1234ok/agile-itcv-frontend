import type { IUser } from "@/types/user";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponseData {
  access_Token: string;
  refresh_Token: string;
  user: IUser;
}

export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface IRegisterResponseData {
  user: IUser;
}
