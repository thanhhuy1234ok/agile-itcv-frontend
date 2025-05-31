import React from "react";
import { HomeOutlined, EnvironmentOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import UploadLogo from "@/components/foundation/CustomUpload"; 
import dayjs from "dayjs";
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';
import { Avatar, Tag, Tooltip, Input, Select } from "antd";
import { FORMATE_DATE_VN, FORMATE_DATE_TIME_VN } from "@/utils/format.time";

const renderMarkdown = (text) => <ReactMarkdown>{text}</ReactMarkdown>;

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
    render: (formInstance) => (
      <MdEditor
        className="no-fullscreen"
        renderHTML={renderMarkdown}
        config={{
          view: {
            menu: true,
            md: true,
            html: false, 
          },
        }}
        value={formInstance.getFieldValue("description") || ""}
        onChange={({ text }) => {
          formInstance.setFieldsValue({ description: text });
        }}
      />
    ),
  }
];

export const getEditStatusCompanyFormFields = () => [
  {
    name: 'isActive',
    label: 'Trạng thái',
    rules: [{ required: true }],
    render: () => (
      <Select placeholder="Chọn trạng thái">
        <Select.Option value={true}>Hoạt động</Select.Option>
        <Select.Option value={false}>Tạm khóa</Select.Option>
      </Select>
    ),
  },
];

export const getColumns = (currentPage, pageSize, setVisible, setSelectedCompany, form, setModalType) => [
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
          setModalType('changestatus'); 
          setVisible(true);
          form.setFieldsValue({ isActive: record.isActive });
          console.log(record);           
        }}
      >
        {isActive ? "Hoạt động" : "Tạm khóa"}
      </Tag>
    ),
  },
  {
    title: "Thao tác",
    key: "action",
    render: (_, record) => (
      <>
        <EyeOutlined
          style={{ cursor: "pointer", fontSize: 18, marginRight: 16 }}
          onClick={() => {
            setSelectedCompany(record);
            setModalType("viewdetail");
            setVisible(true);
          }}
        />
        <EditOutlined
          style={{ cursor: "pointer", fontSize: 18 }}
          onClick={() => {
            console.log("Record khi bấm Edit:", record);

            const fileList = record.logo
              ? [
                  {
                    uid: "-1",
                    name: "logo.jpg",
                    status: "done",
                    url: record.logo,
                  },
                ]
              : [];

            setSelectedCompany(record);
            setModalType("updatecompany");
            setVisible(true);

            form.setFieldsValue({
              ...record,
              logo: fileList, 
            });
          }}
        />
      </>
    ),
  },
];

