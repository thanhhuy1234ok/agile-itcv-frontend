import React from "react";
import { Card, Button } from "antd";
import CompanyDetail from "../modal/CompanyDetailModal";
import CustomTableToolbar from "@/components/foundation/CustomTableToolbar";
import CustomTable from "@/components/foundation/CustomTable";
import CustomModal from "@/components/foundation/CustomModal";
import CustomForm from "@/components/foundation/CustomForm";
import useManageUser from "../viewmodal/AdminManageCompany";
import ListJob from "../modal/ListJob";
import "./style.AdminManageCompany.scss";

const ManageCompany = () => {

  const {
    company,
    loading,
    total,
    pageSize,
    currentPage,
    visible,
    modalType,
    form,
    selectedCompany,
    jobModalVisible,
    jobs,
    jobsLoading,
    fetchJobsByCompany,
    setJobModalVisible,
    setModalType,
    setSelectedCompany,
    setVisible,
    handleSearch,
    handleRefresh,
    onPageChange,
    handleSortChange,
    getFormFields,
    handleModalClose,
    handleSubmit,
    getColumns,
  } = useManageUser();

  const columns = getColumns(
    currentPage,
    pageSize,
    setVisible,
    setSelectedCompany,
    form,
    setModalType
  );

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
                setModalType("add");
                form.resetFields();
                setVisible(true);
              }}
            >
              Thêm công ty
            </Button>,
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
          title={
            modalType === "updatecompany"
              ? "Chỉnh sửa công ty"
              : modalType === "changestatus"
              ? "Chỉnh sửa trạng thái"
              : modalType === "viewdetail"
              ? "Chi tiết công ty"
              : "Thêm công ty"
          }
          onCancel={handleModalClose}
          onOk={() => {
            if (modalType !== "viewdetail") form.submit();
          }}
          okText={modalType === "changestatus" ? "Cập nhật" : "Xác nhận"}
          footer={
            modalType === "viewdetail" ? (
              <Button
                type="primary"
                onClick={fetchJobsByCompany}
              >
                Xem các công việc
              </Button>
            ) : undefined
          }
        >
          {modalType === "viewdetail" ? (
            <CompanyDetail data={selectedCompany} />
          ) : (
            <CustomForm
              form={form}
              fields={getFormFields()}
              onFinish={handleSubmit}
            />
          )}
        </CustomModal>

        <CustomModal
        visible={jobModalVisible}
        title="Danh sách công việc"
        onCancel={() => setJobModalVisible(false)}
        footer={null}
      >
        <ListJob jobs={jobs} jobsLoading={jobsLoading} />
      </CustomModal>

      </Card>
    </div>
  );
};

export default ManageCompany;
