import React from "react";
import CustomTable from "@/components/foundation/CustomTable";
import CustomTableToolbar from "@/components/foundation/CustomTableToolbar";
import { Card, Drawer, Descriptions, Divider, Typography, Form } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import useManageResume from "../viewmodal/AdminManageResumeModal";
import CustomModal from "@/components/foundation/CustomModal"
import CustomForm from "@/components/foundation/CustomForm";
import { getColumns, statusFields } from "../data/ManageResumeData";
import { FORMATE_DATE_VN } from "@/utils/format.time";
import dayjs from "dayjs";
import "./style.AdminManageResume.scss"

const { Title } = Typography;

const ManageResume = () => {
  const {
    dataSource,
    loading,
    total,
    currentPage,
    pageSize,
    companyFilters,
    jobFilters,
    drawerOpen,
    selectedRecord,
    statusModalOpen,
    statusRecord,
    handleViewDetail,
    setStatusRecord,
    handleSearch,
    handleRefresh,
    handleSortChange,
    onPageChange,
    setDrawerOpen,
    handleUpdateStatus,
    setStatusModalOpen,
  } = useManageResume();
  const [form] = Form.useForm();
  const columns = getColumns(currentPage, pageSize, companyFilters, jobFilters, handleViewDetail, setStatusRecord, setStatusModalOpen, form);

  return (
    <Card>
      <CustomTableToolbar
        onSearch={handleSearch}
        onRefresh={handleRefresh}
        fields={["email", "status"]}
      />

      <CustomTable
        title="Danh sách hồ sơ"
        columns={columns}
        data={dataSource}
        loading={loading}
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
        sortFields={{ email: "Email", createdAt: "Ngày tạo" }}
        onSortChange={handleSortChange}
      />

      <Drawer
        title="Chi tiết ứng viên"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={700}
        styles={{
          body: { padding: "24px 32px", maxHeight: "80vh", overflowY: "auto" }
        }}
      >
        {selectedRecord && (
          <div>
            <Title
              level={4}
              style={{ color: "#1890ff", marginBottom: 16, fontWeight: "700" }}
            >
              Thông tin ứng viên
            </Title>

            <Descriptions
              column={1}
              bordered
              size="middle"
              styles={{
                label: {
                  width: 160,
                  fontWeight: 600,
                  fontSize: 15,
                  color: "#333",
                },
                content: {
                  color: "#555",
                  fontSize: 14,
                }
              }}
            >
              <Descriptions.Item label="Email ứng viên">
                {selectedRecord.email}
              </Descriptions.Item>

              <Descriptions.Item label="Ngày nộp hồ sơ">
                {dayjs(selectedRecord.createdAt).format(FORMATE_DATE_VN)}
              </Descriptions.Item>

              <Descriptions.Item label="Trạng thái">
                {selectedRecord.status}
              </Descriptions.Item>

              <Descriptions.Item label="Kỹ năng phù hợp">
                {selectedRecord.matchedSkills?.length
                  ? selectedRecord.matchedSkills.join(", ")
                  : "Không có"}
              </Descriptions.Item>

              <Descriptions.Item label="Ngôn ngữ">
                {selectedRecord.analysis?.foundLanguages?.length
                  ? selectedRecord.analysis.foundLanguages.join(", ")
                  : "Không có"}
              </Descriptions.Item>

              <Descriptions.Item label="Điểm đánh giá">
                <span
                  style={{
                    color: selectedRecord.score < 5 ? "#ff4d4f" : "#52c41a",
                    fontWeight: "bold",
                    fontSize: 16,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {selectedRecord.score}
                  {selectedRecord.score < 5 ? (
                    <CloseCircleTwoTone twoToneColor="#ff4d4f" />
                  ) : (
                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                  )}
                </span>
              </Descriptions.Item>

              <Descriptions.Item label="Phân tích">
                <div
                  style={{
                    backgroundColor: "#f6ffed",
                    padding: "12px 16px",
                    borderRadius: 6,
                    fontStyle: "italic",
                    fontSize: 14,
                    color: "#237804",
                    boxShadow: "0 1px 3px rgba(35, 120, 4, 0.2)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {selectedRecord.analysis?.summary || "Không có phân tích"}
                </div>
              </Descriptions.Item>
            </Descriptions>

            <Divider
              style={{ borderTop: "2px solid #1890ff", marginTop: 32, marginBottom: 24 }}
            />

            <Title
              level={4}
              style={{ color: "#1890ff", marginBottom: 16, fontWeight: "700" }}
            >
              Thông tin công ty
            </Title>

            <Descriptions
              column={1}
              bordered
              size="middle"
              styles={{
                label: {
                  width: 160,
                  fontWeight: 600,
                  fontSize: 15,
                  color: "#333",
                },
                content: {
                  color: "#555",
                  fontSize: 14,
                }
              }}
            >
              <Descriptions.Item label="Tên công ty">
                {selectedRecord.companyId?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {selectedRecord.companyId?.address}
              </Descriptions.Item>
            </Descriptions>

            <Divider
              style={{ borderTop: "2px solid #1890ff", marginTop: 32, marginBottom: 24 }}
            />

            <Title
              level={4}
              style={{ color: "#1890ff", marginBottom: 16, fontWeight: "700" }}
            >
              Thông tin tuyển dụng
            </Title>

            <Descriptions
              column={1}
              bordered
              size="middle"
              styles={{
                label: {
                  width: 160,
                  fontWeight: 600,
                  fontSize: 15,
                  color: "#333",
                },
                content: {
                  color: "#555",
                  fontSize: 14,
                }
              }}
            >
              <Descriptions.Item label="Vị trí ứng tuyển">
                {selectedRecord.jobId?.name}
              </Descriptions.Item>

              <Descriptions.Item label="Kỹ năng yêu cầu">
                {selectedRecord.jobId?.skill?.join(", ")}
              </Descriptions.Item>

              <Descriptions.Item label="Mức lương">
                {selectedRecord.jobId?.salary?.toLocaleString()} VND
              </Descriptions.Item>

              <Descriptions.Item label="Cấp độ yêu cầu">
                {selectedRecord.jobId?.level}
              </Descriptions.Item>

              <Descriptions.Item label="Địa điểm làm việc">
                {selectedRecord.jobId?.location?.toUpperCase()}
              </Descriptions.Item>

              <Descriptions.Item label="Mô tả công việc">
                {selectedRecord.jobId?.description}
              </Descriptions.Item>

              <Descriptions.Item label="Thời gian tuyển">
                {dayjs(selectedRecord.jobId?.startDate).format(FORMATE_DATE_VN)} -{" "}
                {dayjs(selectedRecord.jobId?.endDate).format(FORMATE_DATE_VN)}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Drawer>

      <CustomModal
        visible={statusModalOpen}
        title={"Thay đổi trạng thái"} 
        onCancel={() => setStatusModalOpen(false)}
        onOk={() => form.submit()}
        okText={"Cập nhật"} 
      >
        <CustomForm
          form={form}
          fields={statusFields}
          initialValues={{ status: statusRecord?.status }}
          onFinish={handleUpdateStatus}
        />
      </CustomModal>

    </Card>
  );
};

export default ManageResume;
