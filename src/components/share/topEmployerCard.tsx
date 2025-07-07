import React from "react";
import { Card, Image, Space, Tag, Typography } from "antd";
import { RightOutlined, CheckCircleOutlined  } from "@ant-design/icons";

const { Title, Text } = Typography;

interface TopEmployerCardProps {
  logo: string;
  name: string;
  skills: string[];
  location: string[];
  jobCount: number;
  onView?: () => void;
}

const TopEmployerCard: React.FC<TopEmployerCardProps> = ({
  logo,
  name,
  skills,
  location,
  jobCount,
  onView,
}) => {
    return (
        <Card
        hoverable
        style={{
            textAlign: "center",
            borderRadius: 10,
            height: "100%",
        }}
        styles={{ body: { padding: 24 } }}
        onClick={onView}
        >
        <Image
            src={logo}
            alt={name}
            width={80}
            height={80}
            preview={false}
            style={{ objectFit: "contain", marginBottom: 16 }}
        />

        <Title level={4}>{name}</Title>

        <Space wrap style={{ justifyContent: "center", margin: "5px 0 50px 0" }}>
            {skills.map((skill, index) => (
            <Tag color="#DEDEDE" key={index} style={{ color: "#000" }}>
                {skill}
            </Tag>
            ))}
        </Space>

        <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <Text strong>{location.join(" - ")}</Text>
                </div>
                <div>
                    <CheckCircleOutlined style={{ color: "green", marginRight: 10 }} />
                    <Text strong>{jobCount} việc làm <RightOutlined /></Text>
                </div>
            </div>
        </div>
    </Card>
  );
};

export default TopEmployerCard;
