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

  const handleEditUser = (user) => {
    console.log("Chỉnh sửa người dùng:", user);
  };

  const handleSortChange = (value) => {
    const [field, order] = value.split("_");
    const sortParam = order === "asc" ? field : `-${field}`;
    console.log(`Sắp xếp theo: ${sortParam}`);
    fetchUsers({ sort: sortParam });
  };
  

  return {
    users,
    loading,
    handleSearch,
    fetchUsers,
    currentPage,
    pageSize,
    onPageChange,
    handleEditUser,
    handleSortChange
  };
};

export default useManageUser;
