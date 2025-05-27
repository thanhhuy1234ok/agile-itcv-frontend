import React, { useEffect, useState } from "react";
import CustomTable from "@/components/foundation/CustomTable";
import { getAllResumes } from "@/services/api"; 
import { getColumns } from "../data/ManageResumeData"

const ManageResume = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);  
  const [pageSize, setPageSize] = useState(10); 
  const [companyFilters, setCompanyFilters] = useState([]);
  const [jobFilters, setJobFilters] = useState([]);


  const fetchResumes = async (queryParams = {}) => {
  setLoading(true);
  try {
    const params = {
      current: currentPage,
      pageSize: pageSize,
      populate: 'companyId,jobId',
      ...queryParams,
    };
    const res = await getAllResumes(params);
    const resumes = res?.data?.result?.data || [];
    setDataSource(resumes);
    setTotal(res?.data?.result?.meta?.total || 0);

    // ----- Company Filters -----
    const companyIds = resumes.map(item => item.companyId).filter(Boolean);
    const uniqueCompanies = Array.from(new Set(companyIds.map(id => JSON.stringify(id))))
      .map(idStr => JSON.parse(idStr))
      .map(company => ({
        text: company?.name || company,
        value: company?._id || company,
      }));
    setCompanyFilters(uniqueCompanies);

    // ----- Job Filters -----
    const jobIds = resumes.map(item => item.jobId).filter(Boolean);
    const uniqueJobs = Array.from(new Set(jobIds.map(id => JSON.stringify(id))))
      .map(idStr => JSON.parse(idStr))
      .map(job => ({
        text: job?.name || job,
        value: job?._id || job,
      }));
    setJobFilters(uniqueJobs);
  } catch (error) {
    console.error("Failed to fetch resumes:", error);
  } finally {
    setLoading(false);
  }
};



  const handleSortChange = (value) => {
    const [field, order] = value.split("_");
    const sortParam = order === "asc" ? field : `-${field}`;
    fetchResumes({ sort: sortParam });
  };

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  useEffect(() => {
    fetchResumes();
  }, [currentPage, pageSize]);

  const columns = getColumns(currentPage, pageSize, companyFilters, jobFilters)

  return (
    <CustomTable
        title="Danh sách người dùng"
        columns={columns}
        data={dataSource}
        loading={loading}
        total={total}
        pageSize={pageSize}                   
        currentPage={currentPage}             
        onPageChange={onPageChange} 
        sortFields={{ email: 'Email', createdAt: 'Ngày tạo' }}
        onSortChange={handleSortChange}  
    />
  );
};

export default ManageResume;
