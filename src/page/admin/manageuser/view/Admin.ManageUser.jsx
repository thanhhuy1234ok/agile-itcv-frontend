import React, { useState } from "react";
import CustomTable from "@/components/foundation/CustomTable";
import CustomTableToolbar from "@/components/foundation/CustomTableToolbar";
import { Card, Button, Tag } from "antd";
import useManageUser from "../viewmodal/AdminManageUserModal";

const ManageUser = () => {
  const { 
    users, 
    loading, 
    handleSearch, 
    fetchUsers, 
    currentPage, 
    pageSize, 
    onPageChange } = useManageUser();

  const columns = [
    {
      title: "ID",
      key: "id",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1, 
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        if (role.name === 'ADMIN') {
          return <Tag color="red">{role.name}</Tag>; 
        }
        else{
          return <Tag color="green">{role.name}</Tag>;
        }
      },
    },
  ];

  return (
    <div>
      <Card>
        <CustomTableToolbar
          onSearch={handleSearch}
          onRefresh={() => { 
            fetchUsers();
          }}
          fields={['name', 'email', 'role']}
          buttons={[
            <Button type="primary" key="add">Thêm người dùng</Button>,
          ]}
        />
        <CustomTable
          title="Danh sách người dùng"
          columns={columns}
          data={users}
          loading={loading}
          pageSize={pageSize}                   
          currentPage={currentPage}             
          onPageChange={onPageChange}           
        />
      </Card>
    </div>
  );
};

export default ManageUser;
