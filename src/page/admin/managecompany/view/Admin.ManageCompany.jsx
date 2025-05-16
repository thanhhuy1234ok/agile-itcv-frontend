import React from "react";
import { Card } from "antd";
import CustomTableToolbar from "@/components/foundation/CustomTableToolbar";
import CustomTable from "@/components/foundation/CustomTable";
import useManageUser from "../viewmodal/AdminManageCompany"; 
import getColumns from "../data/ManageCompanyData";

const ManageCompany = () => {
  const {
    company,
    loading,
    total,
    pageSize,
    currentPage,
    handleSearch,
    handleRefresh,
    onPageChange,
    handleSortChange,
  } = useManageUser();

  const columns = getColumns(currentPage, pageSize);

  return (
    <div>
      <Card>
        <CustomTableToolbar
          onSearch={handleSearch}
          onRefresh={handleRefresh}
          fields={["name", "address"]}
        />
        <CustomTable
          title="Danh sách công ty"
          columns={columns}
          data={company}
          loading={loading}
          total={total}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={onPageChange}
          sortFields={{ name: "Tên", createdAt: "Ngày tạo" }}
          onSortChange={handleSortChange}
        />
      </Card>
    </div>
  );
};

export default ManageCompany;
