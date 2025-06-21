export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ILoginResponseData {
  access_Token: string;
  refresh_Token: string;
  user: IUser;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IBackendRes<T> {
  code: number;
  message: string;
  data: T;
}