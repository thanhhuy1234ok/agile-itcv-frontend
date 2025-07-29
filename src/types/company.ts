export interface ICompany {
  _id: string;
  name: string;
  address: string;
  logo: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    _id: string;
    email: string;
  };
  deletedBy: {
    _id: string | null;
    email: string | null;
  };
  __v: number;
}

export interface ICompanyWithCount extends ICompany {
  jobCount: number;
}

export interface ICompanyListResponse {
  result: {
    meta: {
      current: number;
      pageSize: number;
      total: number;
      pages: number;
    };
    data: ICompany[];
  };
}

export interface ICompanyDetailResponse {
  result: ICompany;
}
