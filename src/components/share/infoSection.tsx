import React from "react";
import { Col, Row } from "antd";
import SectionLayout from "@/components/share/SectionLayout";
import InfoCard from "@/components/share/surveyCard";

const InfoSection: React.FC = () => {
  return (
    <SectionLayout>
      <Row gutter={32} justify="center">
        <Col xs={24} sm={12} md={8}>
          <InfoCard
            image="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
            title="Passive Job Search"
            description="Khám phá xu hướng công nghệ và thị trường việc làm."
            label="HOT"
            labelStyle={{ backgroundColor: "#ff4d4f", color: "white" }}
            buttonText="Xem thêm"
            onButtonClick={() => console.log("Click: Xem thêm xu hướng")}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <InfoCard
            image="https://cdn-icons-png.flaticon.com/512/1098/1098925.png"
            title="CV Template"
            description="Những thay đổi mà AI mang lại cho lập trình viên."
            label="NEW"
            labelStyle={{ backgroundColor: "#52c41a", color: "white" }}
            buttonText="Xem mẫu"
            onButtonClick={() => console.log("Click: Xem mẫu")}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <InfoCard
            image="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
            title="Blog"
            description="Số liệu được tổng hợp từ cộng đồng IT tại Việt Nam."
            buttonText="Khám phá"
            onButtonClick={() => console.log("Click: khám phá")}
          />
        </Col>
      </Row>
    </SectionLayout>
  );
};

export default InfoSection;
