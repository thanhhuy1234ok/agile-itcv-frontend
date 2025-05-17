import { useState, useEffect } from "react";
import { getAllUsers, getAllRoles, createUser, updateUser } from "@/services/api"; 
import { notification } from "antd";

const useManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);  
  const [pageSize, setPageSize] = useState(10); 
  const [visible, setVisible] = useState(false)
  const [roles, setRoles] = useState([]);
  const [editUser, setEditUser] = useState(null);


  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleRefresh = () => {
    if (currentPage === 1) {
      fetchUsers(); 
    } else {
      setCurrentPage(1); 
    }
  };
  

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
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleSearch = (value, field) => {
    fetchUsers({ [field]: value });
  };

  const handleEditUser = async (values) => {
    try {
      await updateUser(editUser._id, values);  
      notification.success({
        message: "Thành công",
        description: "Chỉnh sửa người dùng thành công!",
      });
      fetchUsers();  
      setVisible(false); 
    } catch (error) {
      console.error("Lỗi khi chỉnh sửa người dùng:", error);
      notification.error({
        message: "Thất bại",
        description: "Không thể chỉnh sửa người dùng. Vui lòng thử lại!",
      });
    }
};


  const handleSortChange = (value) => {
    const [field, order] = value.split("_");
    const sortParam = order === "asc" ? field : `-${field}`;
    fetchUsers({ sort: sortParam });
  };

  const handleAddUser = async (values) => {
    try {
      const { confirmPassword, ...userData } = values; 
      await createUser(userData);     
      notification.success({
        message: "Thành công",
        description: "Thêm người dùng thành công!",
      });
      fetchUsers(); 
      setVisible(false); 
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error);
      notification.error({
        message: "Thất bại",
        description: "Không thể thêm người dùng. Vui lòng thử lại!",
      });
    }
  };

  return {
    users,
    loading,
    total,
    visible,
    currentPage,
    pageSize,
    roles,
    editUser,
    handleRefresh,
    handleSearch,
    fetchUsers,
    onPageChange,
    handleEditUser,
    handleSortChange,
    setVisible,
    setEditUser,
    handleAddUser,
  };
};

export default useManageUser;
