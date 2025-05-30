import React from "react";
import CustomTable from "@/components/foundation/CustomTable";
import CustomTableToolbar from "@/components/foundation/CustomTableToolbar";
import { Card, Button, Form, } from "antd";
import useManageUser from "../viewmodal/AdminManageUserModal";
import CustomModal from '@/components/foundation/CustomModal'
import CustomForm from "@/components/foundation/CustomForm";
import { getUserFormFields, getColumns } from '../data/ManageUserData';

const ManageUser = () => {
  const { 
    users, 
    roles,
    loading, 
    total, 
    currentPage, 
    pageSize, 
    visible, 
    editUser,
    setVisible,
    setEditUser,
    onPageChange,
    handleRefresh,
    handleSearch, 
    handleAddUser,
    handleEditUser,
    handleSortChange,
     } = useManageUser();
    const [form] = Form.useForm();
    const columns = getColumns(currentPage, pageSize, setEditUser, setVisible, form);
  return (
    <div>
      <Card>
        <CustomTableToolbar
          onSearch={handleSearch}
          onRefresh={handleRefresh}
          fields={['name', 'email', 'phone']}
          buttons={[
            <Button 
              type="primary" 
              key="add" 
              onClick={() => {
                setEditUser(null);       
                form.resetFields();      
                setVisible(true);        
              }}
            >Thêm người dùng</Button>,
          ]}
        />
        <CustomTable
          title="Danh sách người dùng"
          columns={columns}
          data={users}
          loading={loading}
          total={total}
          pageSize={pageSize}                   
          currentPage={currentPage}             
          onPageChange={onPageChange} 
          sortFields={{name: "Tên", email: 'Email', createdAt: 'Ngày tạo' }}
          onSortChange={handleSortChange}  
        />

        <CustomModal
          visible={visible}
          title={editUser ? "Chỉnh sửa người dùng" : "Thêm người dùng"} 
          onCancel={() => setVisible(false)}
          onOk={() => form.submit()}
          okText={editUser ? "Cập nhật" : "Xác nhận"} 
          // footer={null}
        >
          <CustomForm
            form={form}
            fields={getUserFormFields(roles, !!editUser)}
            onFinish={(values) => {
              if (editUser) {
                handleEditUser(values); 
              } else {
                handleAddUser(values);  
              }
              form.resetFields(); 
            }}
          />
        </CustomModal>
      </Card>
    </div>
  );
};

export default ManageUser;
