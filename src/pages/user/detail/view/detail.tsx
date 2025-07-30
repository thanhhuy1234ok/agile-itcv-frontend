import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import JobDetailCard from "../../find/component/jobDetailCard";
import { useCurrentApp } from "@/context/app.context";
import { Avatar, Card, Col, Divider, Row, Typography } from "antd";
import type { IJob } from "@/types/job";
import { useJobDetail } from "../viewmodal/useDetail";

const { Text, Title } = Typography;

const JobDetailPage = () => {
  const { isAuthenticated } = useCurrentApp();
  const location = useLocation();
  const navigate = useNavigate();
  const selectedJob: IJob | undefined = location.state?.job;

  const { company } = useJobDetail(selectedJob);

  if (!selectedJob) {
    return (
      <div style={{ padding: 24 }}>
        <Text>Không tìm thấy thông tin công việc.</Text>
        <Text
          onClick={() => navigate("/")}
          style={{ color: "blue", cursor: "pointer", marginLeft: 8 }}
        >
          Quay về trang chủ
        </Text>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          background: "linear-gradient(to right, #000000, #a32020)",
          height: 400,
          position: "relative",
        }}
      />
      <div
        className="wrapper"
        style={{
          marginTop: -200,
          zIndex: 1,
        }}
      >
        <div className="content">
          <Row gutter={80}>
            <Col span={16}>
              <JobDetailCard
                selectedJob={selectedJob}
                isAuthenticated={isAuthenticated}
              />
            </Col>
            <Col span={8}>
              <Card style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <Avatar
                    src={company?.logo}
                    size={100}
                    style={{
                      border: "2px solid black",
                      borderRadius: 8,
                    }}
                  />
                  <div>
                    <Title level={3} style={{ margin: 0 }}>
                      {company?.name}
                    </Title>
                    <Text type="secondary" style={{ fontSize: 16 }}>
                      {company?.address}
                    </Text>
                  </div>
                </div>

                <Divider />

                <div>
                  <Title level={4}>Mô tả công ty</Title>
                  <div style={{ marginTop: 8 }}>
                    <Text style={{ fontSize: 16 }}>
                      {company?.description || "Chưa có mô tả"}
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
