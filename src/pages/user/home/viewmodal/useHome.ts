import { useEffect, useState } from "react";
import { getJobs, getCompany } from "@/services/api";
import { skillOptions } from "@/data/skillsData";
import { useNavigate } from "react-router-dom";
import type { IJob } from "@/types/job";
import type { ICompanyWithCount } from "@/types/company";

const useHome = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [companies, setCompanies] = useState<ICompanyWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const fetchCitiesFromAPI = async (
    search: string
  ): Promise<{ label: string; value: string }[]> => {
    const response = await fetch("https://provinces.open-api.vn/api/?depth=1");
    const data = await response.json();

    return data
      .filter((city: any) =>
        city.name.toLowerCase().includes(search.toLowerCase())
      )
      .map((city: any) => ({
        label: city.name,
        value: city.name,
      }));
  };

  const fetchSkills = async (
    search: string
  ): Promise<{ label: string; value: string }[]> => {
    const filtered = skillOptions.filter((skill) =>
      skill.label.toLowerCase().includes(search.toLowerCase())
    );
    return filtered;
  };

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

        setCompanies(companiesWithCount);
      } else {
        console.error("Lỗi format dữ liệu:", { jobRes, companyRes });
      }
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (): Promise<void> => {
    const params: Record<string, any> = {};

    if (selectedCity) params.location = selectedCity;
    if (keyword) params.skill = keyword;

    const queryString = new URLSearchParams(params).toString();
    navigate(`/find?${queryString}`);
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return {
    jobs,
    companies,
    loading,
    selectedCity,
    keyword,
    fetchCitiesFromAPI,
    fetchSkills,
    setSelectedCity,
    setKeyword,
    handleSearch,
  };
};

export default useHome;
