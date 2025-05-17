import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { Input, Select, Tag, Avatar, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

export const getUserFormFields = (roles, isEdit = false) => [
  {
    name: "name",
    label: "Tên người dùng",
    rules: [{ required: true, message: "Vui lòng nhập tên người dùng" }],
    render: () => <Input prefix={<UserOutlined />} placeholder="Nhập tên người dùng" size="large" />,
  },
  {
    name: "email",
    label: "Email",
    rules: [
      { required: true, message: "Vui lòng nhập email" },
      { type: "email", message: "Email không hợp lệ" },
    ],
    render: () => <Input prefix={<MailOutlined />} placeholder="Nhập email" size="large" />,
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
  ...(!isEdit
    ? [
        {
          name: "password",
          label: "Mật khẩu",
          rules: [{ required: true, message: "Vui lòng nhập mật khẩu!" }],
          render: () => <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu" size="large" />,
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
          render: () => <Input.Password prefix={<LockOutlined />} placeholder="Nhập lại mật khẩu" size="large" />,
        },
      ]
    : []),
  {
    name: "phone",
    label: "Số điện thoại",
    rules: [{ required: true, message: "Vui lòng nhập số điện thoại" }],
    render: () => <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" size="large" />,
  },
];

export const getColumns = (currentPage, pageSize, setEditUser, setVisible, form) => [
  {
    title: "ID",
    key: "id",
    render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
  },
  {
    title: "Ảnh đại diện",
    dataIndex: "img_url",
    key: "img_url",
    render: (img_url) => <Avatar src={img_url} shape="circle" size="medium" />,
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
    render: (role) => (
      <Tag color={role.name === "Admin" ? "red" : "green"}>
        {role.name}
      </Tag>
    ),
  },
  {
    title: "Thao tác",
    key: "action",
    render: (_, record) => (
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => {
          setEditUser(record);
          setVisible(true);
          form.setFieldsValue({
            ...record,
            role: record.role?._id,
          });
        }}
      />
    ),
  },
];
