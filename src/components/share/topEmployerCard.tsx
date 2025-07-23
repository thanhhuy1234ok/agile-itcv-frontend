import React from "react";
import { Card, Image, Typography } from "antd";
import { RightOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

interface TopEmployerCardProps {
  logo: string;
  name: string;
  description: string;
  location: string[];
  jobCount: number;
  onView?: () => void;
}

const TopEmployerCard: React.FC<TopEmployerCardProps> = ({
  logo,
  name,
  description,
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
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
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

      <Paragraph
        style={{
          fontSize: 14,
          color: "#595959",
          height: 72,
          marginBottom: 40,
        }}
        ellipsis={{ rows: 3 }}
      >
        {description}
      </Paragraph>

      <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text strong>{location.join(" - ")}</Text>
          <span>
            <CheckCircleOutlined style={{ color: "green", marginRight: 8 }} />
            <Text strong>
              {jobCount} việc làm <RightOutlined />
            </Text>
          </span>
        </div>
      </div>
    </Card>
  );
};

export default TopEmployerCard;
