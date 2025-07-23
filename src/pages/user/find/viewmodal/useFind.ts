import { useEffect, useState } from "react";
import { getJobs } from "@/services/api";
import type { IJob } from "@/types/job";

interface UseFindProps {
  skill: string;
  location: string;
}

export const useFind = ({ skill, location }: UseFindProps) => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    pages: 1,
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {
        skill,
        location,
        current: pagination.current,
        pageSize: pagination.pageSize,
      };

      const res = await getJobs(params);
      const jobList = res.data?.data?.result?.data || [];
      const meta = res.data?.data?.result?.meta || {
        current: 1,
        pageSize: 10,
        total: 0,
        pages: 1,
      };

      setJobs(jobList);
      setPagination({
        current: meta.current,
        pageSize: meta.pageSize,
        total: meta.total,
        pages: meta.pages,
      });

      if (jobList.length > 0) setSelectedJob(jobList[0]);
    } catch (err) {
      console.error("Lỗi khi fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [skill, location, pagination.current, pagination.pageSize]);

  return {
    jobs,
    selectedJob,
    setSelectedJob,
    loading,
    pagination,
    setPagination,
  };
};
