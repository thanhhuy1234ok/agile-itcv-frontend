import React from "react";
import { Card, Avatar, Tag, Typography } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { IJob } from "@/types/job";
import { useNavigate } from "react-router-dom";
import { useCurrentApp } from "@/context/app.context";

const { Title } = Typography;

interface JobCardProps {
  job: IJob;
  selected: boolean;
  onClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, selected, onClick }) => {
  const { isAuthenticated } = useCurrentApp();
  const navigate = useNavigate();

  return (
    <Card
      title={
        <span style={{ color: "gray" }}>
          Đã đăng {dayjs(job.createdAt).fromNow()}
        </span>
      }
      onClick={onClick}
      style={{
        marginBottom: 16,
        cursor: "pointer",
        border: selected ? "3px solid red" : "1px solid #f0f0f0",
        boxShadow: selected
          ? "0 6px 20px rgba(0, 0, 0, 0.25)"
          : "0 2px 8px rgba(0, 0, 0, 0.1)",
        transition: "all 0.1s ease",
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <Title level={4} style={{ margin: 0, marginBottom: 8 }}>
          {job.name}
        </Title>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Avatar
            style={{
              border: "1px solid black",
              borderRadius: 4,
            }}
            size={50}
            src={job.companyId.avatar}
          />
          <div style={{ marginLeft: 8 }}>
            <Title level={5} style={{ margin: 0 }}>
              {job.companyId.name}
            </Title>
          </div>
        </div>

        <div style={{ fontSize: 16 }}>
          {isAuthenticated ? (
            <span style={{ color: "#0ab305" }}>
              <DollarOutlined style={{ marginRight: 4 }} />
              {(job.salary / 1_000_000).toFixed(0)} triệu
            </span>
          ) : (
            <span
              style={{
                cursor: "pointer",
                textDecoration: "underline",
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

      <div style={{ fontSize: 16 }}>
        <div style={{ marginBottom: 8 }}>
          <span>Số lượng: {job.quantity}</span>
          <span style={{ marginLeft: 8 }}>Cấp bậc: {job.level}</span>
        </div>
        <div style={{ marginBottom: 8 }}>
          <span>Khu vực: {job.location}</span>
        </div>
        <div style={{ marginBottom: 8 }}>
          {job.skill.map((skill, index) => (
            <Tag key={index} color="grey" style={{ fontSize: 16 }}>
              {skill}
            </Tag>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
