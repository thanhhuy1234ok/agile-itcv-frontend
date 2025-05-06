import React, { useState, useEffect } from "react";
import { Table, Spin } from "antd";
import CustomSort from "./CustomSort";
import "@/styles/CustomTableStyle.scss";

const CustomTable = ({
  title,
  total,
  pageSize,
  currentPage,
  columns,
  data,
  loading,
  rowKey = "_id",
  onPageChange,
  enableSort = true,
  sortFields = {},
  onSortChange
}) => {
  return (
    <Spin spinning={loading}>
      <div className="table-header">
        <div className="table-title">{title}</div>
        <div className="table-sort-controls">
        {enableSort && (  
          <div className="table-sort-controls">
            <CustomSort
              sortFields={sortFields}
              onSortChange={onSortChange}
            />
          </div>
        )}
        </div>
      </div>

      <Table
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys, selectedRows) => {
            console.log("Selected Row Keys:", selectedRowKeys);
            console.log("Selected Rows:", selectedRows);
          },
        }}
        columns={columns}
        dataSource={data}
        rowKey={rowKey}
        pagination={{
          total: total,
          current: currentPage,
          pageSize: pageSize,
          onChange: (page, size) => {onPageChange(page, size);console.log(size)},
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total}`,
        }}
        className="data-table"
      />
    </Spin>
  );
};

export default CustomTable;
