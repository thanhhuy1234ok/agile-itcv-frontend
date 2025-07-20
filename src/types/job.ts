export interface IJob {
  _id: string;
  name: string;
  description: string;
  location: string;
  salary: number;
  quantity: number;
  level: string;
  skill: string[];
  startDate: string;
  endDate: string;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  companyId: {
    _id: string;
    name: string;
    address: string;
    avatar: string;
  };
  createdBy: {
    _id: string;
    email: string;
  };
  deletedBy: {
    _id: string | null;
    email: string | null;
  };
}

export interface IJobListResponse {
  result: {
    meta: {
      current: number;
      pageSize: number;
      total: number;
      pages: number;
    };
    data: IJob[];
  };
}
