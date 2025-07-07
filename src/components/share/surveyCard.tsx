import React from "react";
import { Image, Row, Col, Button } from "antd";
import "@/styles/inforcard.style.scss";

interface InfoCardProps {
  image: string;
  title: string;
  description: string;
  label?: string;
  labelStyle?: React.CSSProperties;
  buttonText?: string;
  onButtonClick?: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({
  image,
  title,
  description,
  label,
  labelStyle,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div style={{ padding: "10px", background: "#fff", borderRadius: 8 }}>
      <Row align="middle" gutter={16}>
        <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
          <Image
            src={image}
            alt={title}
            width={50}
            height={50}
            preview={false}
          />
        </Col>

        <Col span={16}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h3 style={{ margin: 0 }}>{title}</h3>
            {label && (
              <span className="infocard-label" style={labelStyle}>
                {label}
              </span>
            )}
          </div>
          <p style={{ marginTop: 8 }}>{description}</p>

          {buttonText && (
            <Button
                className="btn-survey"
                type="primary"
                size="small"
                onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default InfoCard;
