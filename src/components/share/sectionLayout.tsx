import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

interface SectionLayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({
  title,
  description,
  children,
  style,
}) => {
  return (
    <div style={{ paddingTop: 30, ...style }}>
      {title && (
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Title level={2}>{title}</Title>
          {description && (
            <Paragraph style={{ fontSize: 16 }}>{description}</Paragraph>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default SectionLayout;
