import { data } from "react-router-dom";
import { avatar } from "@/assets/avatar/avatar.jpg";
import { Boolean } from "./../../node_modules/sass/types/legacy/function.d";
export {};

declare global {
    interface IBackendRes<T> {
      error?: string | string[];
      message: string;
      statusCode: number | string;
      data?: T;
    }

    interface IModelPaginate<T> {
      meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
      };
      result: T[];
    }

    interface IFetchAccount {
      user: IUser;
    }

    interface IOptionSelect {
      label: string ;
      value: number;
      key?: string;
    }

    interface IUser {
      id: string ;
      email: string;
      name: string;
      avatar: string;
      role: {
        id: string ;
        name: string;
      };
    }

    interface IRole {
      id: string ;
      name: string;
      description: string;
      isActive: boolean;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date;
    }
}
