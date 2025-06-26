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

///////////////////////////////////////

export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string
}

export interface IUserWithExtraFields extends IUser {
  phone: string;
  img_url: string;
  refresh_Token: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  deletedBy: {
    _id: string | null;
    email: string | null;
  };
  __v: number;
}

export interface IRegisterResponseData {
  user: IUserWithExtraFields;
}