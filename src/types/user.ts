export interface IUser {
  _id: string;
  name: string;
  email: string;
  img_url: string;
  role: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IUserWithExtraFields extends IUser {
  phone: string;
  refresh_Token: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  deletedBy: {
    _id: string | null;
    email: string | null;
  };
  __v: number;
}
