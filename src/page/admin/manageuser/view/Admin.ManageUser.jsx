import React from "react";
import CustomTable from "@/components/foundation/CustomTable";
import CustomTableToolbar from "@/components/foundation/CustomTableToolbar";
import { Card, Button, Tag, Input, Form, Select } from "antd";
import { EditOutlined, LockOutlined, PhoneOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import useManageUser from "../viewmodal/AdminManageUserModal";
import CustomModal from '@/components/foundation/CustomModal'
import CustomForm from "@/components/foundation/CustomForm";

const ManageUser = () => {
  const { 
    users, 
    loading, 
    handleRefresh,
    handleSearch, 
    fetchUsers,
    total, 
    currentPage, 
    pageSize, 
    handleEditUser,
    onPageChange,
    handleSortChange,
    visible, 
    setVisible, 
    roles } = useManageUser();

    const [form] = Form.useForm();

    const addUserFormFields = [
      {
        name: "name",
        label: "Tên người dùng",
        rules: [{ required: true, message: "Vui lòng nhập tên người dùng" }],
        render: () => (
          <Input
            prefix={<UserOutlined />}
            placeholder="Nhập tên người dùng"
            size="large"
          />
        ),
      },
      {
        name: "email",
        label: "Email",
        rules: [
          { required: true, message: "Vui lòng nhập email" },
          { type: "email", message: "Email không hợp lệ" },
        ],
        render: () => (
          <Input
            prefix={<MailOutlined />}
            placeholder="Nhập email"
            size="large"
          />
        ),
      },
      {
        name: "role",
        label: "Vai trò",
        rules: [{ required: true, message: "Vui lòng chọn vai trò người dùng" }],
        render: () => (
          <Select placeholder="Chọn vai trò" size="large">
            {roles.map((role) => (
              <Select.Option key={role._id} value={role._id}>
                {role.name}
              </Select.Option>
            ))}
          </Select>
        ),
      },
      {
        name: "password",
        label: "Mật khẩu",
        rules: [{ required: true, message: "Vui lòng nhập mật khẩu!" }],
        render: () => (
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Nhập mật khẩu"
            size="large"
          />
        ),
      },
      {
        name: "confirmPassword",
        label: "Nhập lại mật khẩu",
        dependencies: ["password"], 
        rules: [
          { required: true, message: "Vui lòng nhập lại mật khẩu!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Mật khẩu nhập lại không khớp!"));
            },
          }),
        ],
        render: () => (
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Nhập lại mật khẩu"
            size="large"
          />
        ),
      },
      {
        name: "phone",
        label: "Số điện thoại",
        rules: [{ required: true, message: "Vui lòng nhập số điện thoại" }],
        render: () => (
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Nhập số điện thoại"
            size="large"
          />
        ),
      },
    ];
    

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
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Button 
          type="text" 
          icon={<EditOutlined />} 
          onClick={() => handleEditUser(record)} 
        />
      ),
    }
  ];

  return (
    <div>
      <Card>
        <CustomTableToolbar
          onSearch={handleSearch}
          onRefresh={handleRefresh}
          fields={['name', 'email', 'phone']}
          buttons={[
            <Button type="primary" key="add" onClick={() => setVisible(true)}>Thêm người dùng</Button>,
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
          title="Thêm người dùng"
          onCancel={() => setVisible(false)}
          onOk={() => form.submit()}
          okText="Xác nhận"
          footer={null}
        >
          <CustomForm
            form={form}
            fields={addUserFormFields}
            onFinish={(values) => {
              console.log("Dữ liệu form:", values);
            }}
            
          />
        </CustomModal>
      </Card>
    </div>
  );
};

export default ManageUser;
