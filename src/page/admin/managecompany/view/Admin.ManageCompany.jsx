import React, { useState } from "react";
import { Card } from "antd";
import CustomTableToolbar from "@/components/foundation/CustomTableToolbar";
import CustomTable from "@/components/foundation/CustomTable";

const ManageCompany = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Công ty TNHH ABC",
      email: "abc@company.com",
      phone: "0901234567",
      createdAt: "2023-01-01",
    },
    {
      id: 2,
      name: "Công ty CP XYZ",
      email: "xyz@company.com",
      phone: "0909876543",
      createdAt: "2023-03-15",
    },
  ]);
  const [total, setTotal] = useState(2);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (value) => {
    console.log("Searching with:", value);
  };

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const onPageChange = (page, pageSize) => {
    console.log("Page changed:", page, pageSize);
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleSortChange = (field, order) => {
    console.log("Sorting by:", field, order);
  };

  const columns = [
    {
      title: "Tên công ty",
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
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return (
    <div>
      <Card>
        <CustomTableToolbar
          onSearch={handleSearch}
          onRefresh={handleRefresh}
          fields={["name", "email", "phone"]}
        />
        <CustomTable
          title="Danh sách công ty"
          columns={columns}
          data={users}
          loading={loading}
          total={total}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={onPageChange}
          sortFields={{ name: "Tên", email: "Email", createdAt: "Ngày tạo" }}
          onSortChange={handleSortChange}
        />
      </Card>
    </div>
  );
};

export default ManageCompany;
