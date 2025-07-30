import { useEffect, useState } from "react";
import { getCompanyById } from "@/services/api";
import type { ICompany } from "@/types/company";
import type { IJob } from "@/types/job";

export const useJobDetail = (job: IJob | undefined) => {
  const [company, setCompany] = useState<ICompany | null>(null);

  const fetchCompanyById = async (id: string) => {
    try {
      const res = await getCompanyById(id);
      setCompany(res.data.data.result);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin công ty:", error);
    }
  };

  useEffect(() => {
    if (job?.companyId._id) {
      fetchCompanyById(job.companyId._id);
    }
  }, [job?.companyId._id]);

  return {
    company,
  };
};
