import React, { useState } from "react";
import { Input, Select, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import "@/styles/CustomTableToolbarStyle.scss";

const { Option } = Select;

const TableToolbar = ({
  onSearch,
  onRefresh,
  buttons = [],
  fields = [],
}) => {
  const [selectedField, setSelectedField] = useState(fields[0]);

  const handleFieldChange = (value) => {
    setSelectedField(value);
  };

  return (
    <div className="table-toolbar">
      <div className="toolbar-left">
        <Select
          value={selectedField}
          onChange={handleFieldChange}
          className="select-field"
        >
          {fields.map((field, index) => (
            <Option key={index} value={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </Option>
          ))}
        </Select>

        <Input.Search
          placeholder={`Tìm kiếm theo ${selectedField}...`}
          onSearch={(value) => onSearch(value, selectedField)}
          className="search-input"
          allowClear
        />

        {buttons.map((btn, index) => (
          <React.Fragment key={index}>{btn}</React.Fragment>
        ))}
      </div>

      <Button icon={<ReloadOutlined />} onClick={onRefresh} type="primary">
        Làm mới
      </Button>
    </div>
  );
};

export default TableToolbar;
