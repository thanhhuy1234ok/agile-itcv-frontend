import { useState, useEffect } from "react";
import { getAllCompanies, getAllJobs } from "@/services/api"; 

const useHomepage = () => {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      const queryParams = {
        current: 1,
        pageSize: 6,
        sort: "-createdAt", 
      };
      const res = await getAllCompanies(queryParams);
      setCompanies(res?.data?.result?.data || []);
    } catch (err) {
      console.error("Error fetching companies:", err);
    }
  };

  const fetchJobs = async () => {
    try {
      const queryParams = {
        current: 1,
        pageSize: 4,
        sort: "-createdAt", 
      };
      const res = await getAllJobs(queryParams);
      console.log(res);
      setJobs(res?.data?.result?.data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchCompanies(), fetchJobs()]);
      setLoading(false);
    };
    fetchData();
  }, []);  

  return { companies, jobs, loading };
};

export default useHomepage;
