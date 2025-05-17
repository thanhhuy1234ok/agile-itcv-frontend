import React from "react";
import { Select } from "antd";

const { Option } = Select;

const CustomSort = ({ sortFields = {}, onSortChange }) => {
  const handleSortChange = (value) => {
    onSortChange(value); 
  };

  const renderSortOptions = () => {
    return Object.entries(sortFields).flatMap(([key, label]) => [
      <Option key={`${key}_asc`} value={`${key}_asc`}>
        {label} (Tăng dần)
      </Option>,
      <Option key={`${key}_desc`} value={`${key}_desc`}>
        {label} (Giảm dần)
      </Option>,
    ]);
  };

  return (
    <Select
      onChange={handleSortChange}
      placeholder="Sắp xếp"
      style={{ minWidth: 180 }}
      allowClear
    >
      {renderSortOptions()}
    </Select>
  );
};

export default CustomSort;
