import { useEffect, useState } from "react";
import { getJobs, getCompany } from "@/services/api";

import type { IJob } from "@/types/job";
import type { ICompanyWithCount } from "@/types/company";

const useHome = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [companies, setCompanies] = useState<ICompanyWithCount[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHomeData = async () => {
    try {
      const [jobRes, companyRes] = await Promise.all([getJobs(), getCompany()]);

      const jobList = jobRes.data.data?.result?.data || [];

      const companyList = companyRes.data.data?.result?.data || [];

      if (jobRes.data.code === 1 && companyRes.data.code === 1) {
        setJobs(jobList);

        const jobCountMap: Record<string, number> = {};
        for (const job of jobList) {
          const companyId = job.companyId?._id;
          if (companyId) {
            jobCountMap[companyId] = (jobCountMap[companyId] || 0) + 1;
          }
        }

        const companiesWithCount: ICompanyWithCount[] = companyList.map(
          (company) => ({
            ...company,
            jobCount: jobCountMap[company._id] || 0,
          })
        );

        setCompanies(companiesWithCount.slice(0, 4));
      } else {
        console.error("Lỗi format dữ liệu:", { jobRes, companyRes });
      }
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return {
    jobs,
    companies,
    loading,
  };
};

export default useHome;
