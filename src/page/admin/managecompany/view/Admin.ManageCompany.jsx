import React, {useState} from "react";
import { Card, Form, Button } from "antd";
import CustomTableToolbar from "@/components/foundation/CustomTableToolbar";
import CustomTable from "@/components/foundation/CustomTable";
import CustomModal from '@/components/foundation/CustomModal'
import CustomForm from "@/components/foundation/CustomForm";
import useManageUser from "../viewmodal/AdminManageCompany"; 
import { getCompanyFormFields, getColumns } from "../data/ManageCompanyData";

const ManageCompany = () => {
  const {
    company,
    loading,
    total,
    pageSize,
    currentPage,
    visible,
    setVisible,
    handleSearch,
    handleRefresh,
    onPageChange,
    handleSortChange,
    handleAddCompany
  } = useManageUser();

  const [form] = Form.useForm();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const columns = getColumns(currentPage, pageSize, setVisible, setSelectedCompany);

  return (
    <div>
      <Card>
        <CustomTableToolbar
          onSearch={handleSearch}
          onRefresh={handleRefresh}
          fields={["name", "address"]}
          buttons={[
            <Button 
              type="primary" 
              key="add" 
              onClick={() => {
                setSelectedCompany(null);       
                form.resetFields();      
                setVisible(true);        
              }}
            >Thêm công ty</Button>,
          ]}
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

        <CustomModal
          visible={visible}
          title={ selectedCompany ? "Chỉnh sửa công ty" : "Thêm người dùng"} 
          onCancel={() => setVisible(false)}
          onOk={() => form.submit()}
          okText={ selectedCompany ? "Cập nhật" : "Xác nhận"} 
          footer={null}
        >
          <CustomForm
            form={form}
            fields={getCompanyFormFields()}
            onFinish={(values) => {
              handleAddCompany(values);   
              form.resetFields();
              setVisible(false);
            }}
          />
        </CustomModal>
      </Card>
    </div>
  );
};

export default ManageCompany;
