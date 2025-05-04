import React, { useState, useEffect } from "react";
import { Table, Spin } from "antd";
import "@/styles/CustomTableStyle.scss";

const CustomTable = ({
  title,
  pageSize,
  currentPage,
  columns,
  data,
  loading,
  rowKey = "_id",
  onPageChange,
}) => {
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  useEffect(() => {
    setCurrentPageSize(pageSize); 
  }, [pageSize]);

  return (
    <Spin spinning={loading}>
      <div className="table-header">
        <div className="table-title">{title}</div>
      </div>

      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys, selectedRows) => {
            console.log("Selected Row Keys:", selectedRowKeys);
            console.log("Selected Rows:", selectedRows);
          },
        }}
        columns={columns}
        dataSource={data}
        rowKey={rowKey}
        pagination={{
          current: currentPage,                
          pageSize: currentPageSize,          
          onChange: (page, size) => onPageChange(page, size), 
          showSizeChanger: true,               
          onShowSizeChange: (current, size) => {setCurrentPageSize(size); console.log(size)}, 
          showTotal: (total) => `Tổng ${total}`,  
        }}
        className="data-table"
      />
    </Spin>
  );
};

export default CustomTable;
