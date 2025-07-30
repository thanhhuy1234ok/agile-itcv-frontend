import React from "react";
import { Card, Typography, Image, Divider, Tag, Badge } from "antd";
import {
  DollarOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import type { IJob } from "@/types/job";

const { Text, Paragraph, Title } = Typography;

interface JobCardProps {
  job: IJob;
}

const CardJob: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();

  return (
    <Badge.Ribbon text="NEW FOR YOU" color="#fa541c" placement="end">
      <Card
        className="jobdetail-card"
        bordered
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Title
          className="job-title"
          level={3}
          style={{
            fontSize: 20,
            marginTop: 12,
            marginBottom: 12,
            height: 56,
            overflow: "hidden",
            cursor: "pointer",
          }}
          ellipsis={{ rows: 2 }}
          onClick={() => navigate("/jobdetail", { state: { job: job } })}
        >
          {job.name}
        </Title>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <Image
            src={job.companyId.avatar}
            width={50}
            preview={false}
            style={{ objectFit: "contain", borderRadius: 4 }}
            alt={`${job.companyId.avatar} logo`}
          />
          <Text style={{ margin: 0, fontWeight: "bold", fontSize: 18 }}>
            {job.companyId.name}
          </Text>
        </div>

        <div style={{ marginBottom: 8 }}>
          <Text style={{ fontSize: 14, color: "#8c8c8c", display: "block" }}>
            <strong>Thời gian:</strong>{" "}
            {dayjs(job.startDate).format("DD/MM/YYYY")} -{" "}
            {dayjs(job.endDate).format("DD/MM/YYYY")}
          </Text>
        </div>

        <Text
          style={{
            fontSize: 14,
            color: "#8c8c8c",
            display: "block",
            marginBottom: 8,
          }}
        >
          <strong>Số lượng tuyển:</strong> {job.quantity}
        </Text>

        <Text style={{ fontSize: 18, color: "#0ab305" }}>
          <DollarOutlined /> {`${(job.salary / 1_000_000).toFixed(0)} triệu`}
        </Text>

        <Divider style={{ margin: "12px 0" }} />

        <Paragraph style={{ marginBottom: 8 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                color: "#a6a6a6",
              }}
            >
              <UserOutlined style={{ marginRight: 5 }} />
              {job.level}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                color: "#a6a6a6",
              }}
            >
              <EnvironmentOutlined style={{ marginRight: 5 }} />
              {job.location}
            </span>
          </div>
        </Paragraph>

        <div style={{ marginTop: 12 }}>
          {job.skill.map((skill, idx) => (
            <Tag key={idx} style={{ marginBottom: 4 }} color="default">
              {skill}
            </Tag>
          ))}
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default CardJob;
