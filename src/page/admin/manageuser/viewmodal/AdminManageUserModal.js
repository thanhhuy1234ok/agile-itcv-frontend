import { useState, useEffect } from "react";
import { getAllUsers, getAllRoles } from "@/services/api"; 

const useManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);  
  const [pageSize, setPageSize] = useState(10); 
  const [visible, setVisible] = useState(false)
  const [roles, setRoles] = useState([]);

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleRefresh = () =>{
    setCurrentPage(1)
  }

  const fetchUsers = async (queryParams = {}) => {
    setLoading(true);
    try {
      const params = { current: currentPage, pageSize: pageSize, ...queryParams };
      const response = await getAllUsers(params);
      const userData = response.data.result.data;
      setUsers(userData); 
      setTotal(response.data.result.meta.total);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchRoles = async (queryParams = {}) => {
    try {
      const params = { current: currentPage, pageSize: pageSize, ...queryParams };
      const response = await getAllRoles(params);
      setRoles(response.data.result.data); 
    } catch (error) {
      console.error("Lỗi khi lấy vai trò:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); 
    fetchRoles();
  }, [currentPage, pageSize]);

  const handleSearch = (value, field) => {
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

  const handleAddUser = (values)=>{

  }
  

  return {
    users,
    loading,
    handleRefresh,
    handleSearch,
    fetchUsers,
    total,
    currentPage,
    pageSize,
    onPageChange,
    handleEditUser,
    handleSortChange,
    visible,
    setVisible,
    roles
  };
};

export default useManageUser;
