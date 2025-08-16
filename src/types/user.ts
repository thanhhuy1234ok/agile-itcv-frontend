export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  img_url: string;
  cv_url?: string;
  role: {
    _id: string;
    name: string;
  };
  refresh_Token?: string | null;
  isDeleted?: boolean;
  deletedAt?: string | null;
  deletedBy?: {
    _id: string | null;
    email: string | null;
  };
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IUpdateUserResponse {
  updatedUser: IUser;
}
