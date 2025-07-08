import React from "react";
import { Card, Typography, Image, Divider, Tag, Badge } from "antd";
import {
  DollarOutlined,
  UserOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Text, Paragraph } = Typography;

export interface JobCardProps {
  nameJob: string;
  company: string;
  logo: string;
  position: string;
  location: string;
  type: string;
  salary: string;
  skills: string[];
}

const CardJob: React.FC<JobCardProps> = ({
  nameJob,
  company,
  logo,
  position,
  location,
  type,
  salary,
  skills,
}) => {
  return (
    <Badge.Ribbon text="NEW FOR YOU" color="#fa541c" placement="end">
      <Card
        title={nameJob}
        bordered
        style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        styles={{ header:{ fontSize: 20 }}}
      >
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

        <Text style={{ fontSize: 18, color: "#0ab305" }}>
          <DollarOutlined /> {salary}
        </Text>

        <Divider style={{ margin: "12px 0" }} />

        <Paragraph style={{ marginBottom: 8 }}>
          <div style={{ marginBottom: 4 }}>
            <UserOutlined style={{ marginRight: 8, color: "#a6a6a6" }} />
            {position}
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <span>
              <ClockCircleOutlined style={{ marginRight: 8, color: "#a6a6a6" }} />
              {type}
            </span>
            <span>
              <EnvironmentOutlined style={{ marginRight: 8, color: "#a6a6a6" }} />
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
