// Backend model for jobs

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
    isNegotiable: boolean;
  };
  skills: string[]; // Array of skill IDs
  levels: string[]; // Array of level IDs
  description: string;
  requirements: string;
  benefits: string;
  isHybrid: boolean;
  isRemote: boolean;
  isUrgent: boolean;
  postedDate: Date;
  expiryDate: Date;
  isActive: boolean;
  views: number;
  applications: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobResponse {
  id: string;
  title: string;
  company: {
    id: string;
    name: string;
    logo: string;
  };
  location: string;
  salary: {
    display: string;
    isNegotiable: boolean;
  };
  skills: Array<{ id: string; name: string }>;
  postedDate: string;
  isHybrid: boolean;
  isRemote: boolean;
  isUrgent: boolean;
}

export interface JobSearchParams {
  keyword?: string;
  skills?: string[];
  levels?: string[];
  companies?: string[];
  cities?: string[];
  salaryMin?: number;
  salaryMax?: number;
  isRemote?: boolean;
  isHybrid?: boolean;
  isUrgent?: boolean;
  page?: number;
  limit?: number;
  sortBy?: "newest" | "salary" | "relevance";
}
