// Backend model for job categories

export interface JobCategory {
  id: string;
  name: string;
  type: "skill" | "level" | "company" | "city";
  slug: string;
  jobCount?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobCategoryResponse {
  id: string;
  name: string;
  type: string;
  slug: string;
  jobCount: number;
}
