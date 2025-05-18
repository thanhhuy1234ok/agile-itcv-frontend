import React from "react";
import { HomeOutlined, EnvironmentOutlined } from "@ant-design/icons";
import UploadLogo from "@/components/foundation/CustomUpload"; 
import dayjs from "dayjs";
import { Avatar, Tag, Tooltip, Input } from "antd";
import { FORMATE_DATE_VN, FORMATE_DATE_TIME_VN } from "@/utils/format.time";

export const getCompanyFormFields = () => [
  {
    name: "logo",
    label: "Logo",
    valuePropName: "fileList",
    getValueFromEvent: (e) => (Array.isArray(e) ? e : e?.fileList),
    rules: [{ required: false }],
    render: () => <UploadLogo />,
  },
  {
    name: "name",
    label: "Tên công ty",
    rules: [{ required: true, message: "Vui lòng nhập tên công ty" }],
    render: () => <Input prefix={<HomeOutlined />} placeholder="Nhập tên công ty" size="large" />,
  },
  {
    name: "address",
    label: "Địa chỉ",
    rules: [{ required: true, message: "Vui lòng nhập địa chỉ công ty" }],
    render: () => <Input prefix={<EnvironmentOutlined />} placeholder="Nhập địa chỉ công ty" size="large" />,
  },
  {
    name: "description",
    label: "Mô tả",
    rules: [{ required: false }],
    render: () => <Input.TextArea placeholder="Nhập mô tả công ty" autoSize={{ minRows: 3, maxRows: 6 }} />,
  },
];

export const getColumns = (currentPage, pageSize, setVisible, setSelectedCompany) => [
  {
    title: "ID",
    key: "id",
    render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
  },
  {
    title: "Logo",
    dataIndex: "logo",
    key: "logo",
    render: (logo) => <Avatar src={logo} shape="square" size={50} />,
  },
  {
    title: "Tên công ty",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => {
      const shortDate = dayjs(createdAt).format(FORMATE_DATE_VN);
      const fullDateTime = dayjs(createdAt).format(FORMATE_DATE_TIME_VN);
      return (
        <Tooltip title={fullDateTime}>
          <span>{shortDate}</span>
        </Tooltip>
      );
    },
  },
  {
    title: "Trạng thái",
    dataIndex: "isActive",
    key: "isActive",
    render: (isActive, record) => (
      <Tag
        color={isActive ? "green" : "red"}
        style={{ cursor: "pointer" }}
        onClick={() => {
          setSelectedCompany(record);
          setVisible(true);
          console.log(record);           
        }}
      >
        {isActive ? "Hoạt động" : "Tạm khóa"}
      </Tag>
    ),
  },
];

