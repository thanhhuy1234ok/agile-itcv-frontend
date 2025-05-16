import { useState, useEffect } from "react";
import { getAllCompanies } from "@/services/api"; 
import { notification } from "antd";

const useManageCompany = () => {
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);  
  const [pageSize, setPageSize] = useState(10); 

  const fetchCompanies = async (queryParams = {}) => {
    setLoading(true);
    try {
      const params = { current: currentPage, pageSize, ...queryParams };
      const response = await getAllCompanies(params);
      const companyData = response.data.result.data;
      setCompany(companyData); 
      setTotal(response.data.result.meta.total);
    } catch (error) {
      console.error("Error fetching companies:", error);
      notification.error({
        message: "Lỗi",
        description: "Không thể tải danh sách công ty.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [currentPage, pageSize]);

  const handleSearch = (value, field) => {
    fetchCompanies({ [field]: value });
  };

  const handleRefresh = () => {
    if (currentPage === 1) {
      fetchUsers(); 
    } else {
      setCurrentPage(1); 
    }
  };

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleSortChange = (value) => {
    const [field, order] = value.split("_");
    const sortParam = order === "asc" ? field : `-${field}`;
    fetchCompanies({ sort: sortParam });
  };

  return {
    company,
    loading,
    total,
    currentPage,
    pageSize,
    handleSearch,
    handleRefresh,
    onPageChange,
    handleSortChange,
  };
};

export default useManageCompany;
