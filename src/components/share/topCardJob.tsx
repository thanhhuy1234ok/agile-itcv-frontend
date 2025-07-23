import React from "react";
import { Card, Typography, Image, Divider, Tag, Badge } from "antd";
import {
  DollarOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Text, Paragraph } = Typography;

export interface JobCardProps {
  nameJob: string;
  company: string;
  logo: string;
  position: string;
  location: string;
  salary: string;
  skills: string[];
  startDate: string;
  endDate: string;
  quantity: number;
}

const CardJob: React.FC<JobCardProps> = ({
  nameJob,
  company,
  logo,
  position,
  location,
  salary,
  skills,
  startDate,
  endDate,
  quantity,
}) => {
  return (
    <Badge.Ribbon text="NEW FOR YOU" color="#fa541c" placement="end">
      <Card
        bordered
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Paragraph
          strong
          style={{
            fontSize: 20,
            marginBottom: 12,
            height: 56,
            overflow: "hidden",
          }}
          ellipsis={{ rows: 2 }}
        >
          {nameJob}
        </Paragraph>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <Image
            src={logo}
            width={50}
            preview={false}
            style={{ objectFit: "contain", borderRadius: 4 }}
            alt={`${company} logo`}
          />
          <Text style={{ margin: 0, fontWeight: "bold", fontSize: 18 }}>
            {company}
          </Text>
        </div>

        <div style={{ marginBottom: 8 }}>
          <Text style={{ fontSize: 14, color: "#8c8c8c", display: "block" }}>
            <strong>Thời gian:</strong> {dayjs(startDate).format("DD/MM/YYYY")}{" "}
            - {dayjs(endDate).format("DD/MM/YYYY")}
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
          <strong>Số lượng tuyển:</strong> {quantity}
        </Text>

        <Text style={{ fontSize: 18, color: "#0ab305" }}>
          <DollarOutlined /> {salary}
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
              {position}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                color: "#a6a6a6",
              }}
            >
              <EnvironmentOutlined style={{ marginRight: 5 }} />
              {location}
            </span>
          </div>
        </Paragraph>

        <div style={{ marginTop: 12 }}>
          {skills.map((skill, idx) => (
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
