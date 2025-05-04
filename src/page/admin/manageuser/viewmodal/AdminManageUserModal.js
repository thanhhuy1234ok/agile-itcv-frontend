import { useState, useEffect } from "react";
import { getAllUsers } from "@/services/api"; 

const useManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);  
  const [pageSize, setPageSize] = useState(10); 

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const fetchUsers = async (queryParams = {}) => {
    setLoading(true);
    try {
      const response = await getAllUsers(queryParams);
      const userData = response.data.result.data;
      setUsers(userData); 
      setCurrentPage(1)
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); 
  }, []);

  const handleSearch = (value, field) => {
    console.log(`Searching for ${value} in ${field}`);
    fetchUsers({ [field]: value });
  };

  return {
    users,
    loading,
    handleSearch,
    fetchUsers,
    currentPage,
    pageSize,
    onPageChange
  };
};

export default useManageUser;
