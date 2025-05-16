import React from "react";
import dayjs from "dayjs";
import { Avatar, Tag, Tooltip } from "antd";
import { FORMATE_DATE_VN, FORMATE_DATE_TIME_VN } from "@/utils/format.time"; 

const getColumns = (currentPage, pageSize) => [
  {
    title: "ID",
    key: "id",
    render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
  },
  {
    title: "Logo",
    dataIndex: "logo",
    key: "logo",
    render: (logo) => (
    <Avatar src={logo} shape="square" size={50} />
  ),
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
    dataIndex: "isDeleted",
    key: "isDeleted",
    render: (isDeleted) => 
      isDeleted ? (
        <Tag color="red">Đã xóa</Tag>
      ) : (
        <Tag color="green">Hoạt động</Tag>
      ),
  },
];

export default getColumns;
