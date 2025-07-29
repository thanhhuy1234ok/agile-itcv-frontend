import React, { useState } from "react";
import { Typography, Card, Avatar, Button, Divider, Tag, message } from "antd";
import {
  DollarOutlined,
  LikeOutlined,
  LikeFilled,
  EnvironmentOutlined,
  AimOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import ApplyModal from "./applyModal";
import { applyJob } from "@/services/api";
import ReactMarkdown from "react-markdown";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import type { IJob } from "@/types/job";
import type { UploadFile } from "antd/es/upload/interface";

const { Title, Text } = Typography;

interface JobDetailCardProps {
  selectedJob: IJob;
  isAuthenticated: boolean;
}

const JobDetailCard: React.FC<JobDetailCardProps> = ({
  selectedJob,
  isAuthenticated,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDetailPage = location.pathname === "/jobdetail";
  const [liked, setLiked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);

  if (!selectedJob) return null;

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleOk = async (file?: UploadFile) => {
    if (file && file.originFileObj) {
      setConfirmLoading(true);
      try {
        const res = await applyJob(
          selectedJob.companyId._id,
          file.originFileObj
        );

        if (res.data.code === 1) {
          message.success("Ứng tuyển thành công!");
          setIsModalVisible(false);
          setModalKey((prev) => prev + 1);
        } else {
          message.error("Ứng tuyển thất bại. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error("Lỗi upload:", error);
        message.error("Ứng tuyển thất bại. Vui lòng thử lại.");
      } finally {
        setConfirmLoading(false);
      }
    } else {
      message.warning("Vui lòng tải lên một tệp trước khi xác nhận.");
    }
  };

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => {
    setIsModalVisible(false);
    setModalKey((prev) => prev + 1);
  };

  return (
    <>
      <Card
        className="jobdetail-card"
        style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
        title={!isDetailPage && <Title level={3}>Chi tiết công việc</Title>}
        bordered
        styles={{ body: { padding: 0 } }}
      >
        <div style={{ padding: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 8,
              alignItems: "center",
            }}
          >
            {!isDetailPage && (
              <div>
                <Avatar
                  style={{ border: "1px solid black", borderRadius: 4 }}
                  size={80}
                  src={selectedJob.companyId.avatar}
                />
              </div>
            )}

            <div style={{ paddingLeft: isDetailPage ? 0 : 15, fontSize: 16 }}>
              <div>
                {isDetailPage ? (
                  <Title
                    level={3}
                    style={{
                      margin: 0,
                    }}
                  >
                    {selectedJob.name}
                  </Title>
                ) : (
                  <Title
                    className="job-title"
                    level={3}
                    style={{
                      margin: 0,
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      navigate("/jobdetail", { state: { job: selectedJob } })
                    }
                  >
                    {selectedJob.name}
                  </Title>
                )}
              </div>

              <div>
                <Text style={{ fontSize: 16 }}>
                  {selectedJob.companyId.name}
                </Text>
              </div>
              <div>
                {isAuthenticated ? (
                  <span style={{ color: "#0ab305" }}>
                    <DollarOutlined style={{ marginRight: 4 }} />
                    {(selectedJob.salary / 1_000_000).toFixed(0)} triệu
                  </span>
                ) : (
                  <span
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: "black",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/login");
                    }}
                  >
                    Vui lòng đăng nhập để xem lương
                  </span>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Button
              style={{
                backgroundColor: "red",
                color: "white",
                fontSize: 16,
                flex: 1,
              }}
              onClick={showModal}
            >
              ỨNG TUYỂN NGAY
            </Button>

            <Button
              type="text"
              icon={
                liked ? (
                  <LikeFilled style={{ color: "red", fontSize: 24 }} />
                ) : (
                  <LikeOutlined style={{ fontSize: 24 }} />
                )
              }
              onClick={handleLikeClick}
            />
          </div>
        </div>

        <Divider style={{ margin: 0 }} />
        <div style={{ padding: 24 }}>
          <div style={{ marginBottom: 8 }}>
            <EnvironmentOutlined style={{ fontSize: 16 }} />
            <Text style={{ fontSize: 16, marginLeft: 4 }}>
              Địa chỉ: {selectedJob.companyId.address}
            </Text>
          </div>

          <div
            style={{ display: "flex", flexDirection: "row", marginBottom: 8 }}
          >
            <div>
              <AimOutlined style={{ fontSize: 16 }} />
              <Text style={{ fontSize: 16, marginLeft: 4 }}>
                Cấp độ: {selectedJob.level}
              </Text>
            </div>
            <div style={{ marginLeft: 20 }}>
              <SyncOutlined style={{ fontSize: 16 }} />
              <Text style={{ fontSize: 16, marginLeft: 4 }}>
                Số lượng: {selectedJob.quantity}
              </Text>
            </div>
          </div>

          <div style={{ marginBottom: 8 }}>
            <ClockCircleOutlined style={{ fontSize: 16 }} />
            <Text style={{ fontSize: 16, marginLeft: 4 }}>
              Đã đăng {dayjs(selectedJob.createdAt).fromNow()}
            </Text>
          </div>

          <div>
            <span style={{ fontSize: 16 }}>
              <ToolOutlined /> Kỹ năng:
            </span>
            <span style={{ marginLeft: 8 }}>
              {selectedJob.skill?.map((skill, index) => (
                <Tag key={index} color="grey" style={{ fontSize: 16 }}>
                  {skill}
                </Tag>
              ))}
            </span>
          </div>
        </div>

        <Divider style={{ margin: 0 }} />
        <div style={{ padding: 24 }}>
          <Title level={4} style={{ margin: 0 }}>
            Mô tả công việc
          </Title>
          <div style={{ paddingLeft: 10, fontSize: 16 }}>
            <ReactMarkdown>{selectedJob.description}</ReactMarkdown>
          </div>
        </div>
      </Card>

      <ApplyModal
        key={modalKey}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        job={selectedJob}
        confirmLoading={confirmLoading}
      />
    </>
  );
};

export default JobDetailCard;
