import React from "react";
import { Row, Col, Skeleton } from "antd";
import SectionLayout from "@/components/share/sectionLayout";
import TopEmployerCard from "@/components/share/topEmployerCard";
import type { ICompanyWithCount } from "@/types/company";

interface Props {
  companies: ICompanyWithCount[];
  loading?: boolean;
}

const TopEmployersSection: React.FC<Props> = ({ companies, loading }) => {
  return (
    <SectionLayout
      title="Nhà tuyển dụng hàng đầu"
      description="Khám phá những công ty công nghệ hàng đầu đang tuyển dụng tại Việt Nam"
    >
      <Row gutter={[24, 24]} justify="center">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Skeleton active avatar paragraph={{ rows: 3 }} />
              </Col>
            ))
          : companies.map((company) => (
              <Col xs={24} sm={12} md={8} lg={6} key={company._id}>
                <TopEmployerCard
                  logo={company.logo}
                  name={company.name}
                  description={company.description}
                  location={[company.address]}
                  jobCount={company.jobCount}
                  onView={() => console.log("Xem chi tiết:", company.name)}
                />
              </Col>
            ))}
      </Row>
    </SectionLayout>
  );
};

export default TopEmployersSection;
