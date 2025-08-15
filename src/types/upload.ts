import type { IUser } from "./user";

export interface IUploadResponse {
  url: string;
  originalName: string;
  user: IUser;
}
