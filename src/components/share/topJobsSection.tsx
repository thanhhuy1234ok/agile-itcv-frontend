import React from "react";
import { Row, Col, Skeleton } from "antd";
import SectionLayout from "@/components/share/SectionLayout";
import CardJob from "@/components/share/topCardJob";
import type { IJob } from "@/types/job";

interface Props {
  jobs: IJob[];
  loading?: boolean;
}

const TopJobsSection: React.FC<Props> = ({ jobs, loading }) => {
  return (
    <SectionLayout
      title="Việc làm nổi bật"
      description="Khám phá những vị trí hot từ các công ty hàng đầu"
    >
      <Row gutter={[24, 24]} justify="center">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Skeleton active avatar paragraph={{ rows: 3 }} />
              </Col>
            ))
          : jobs.map((job) => (
              <Col xs={24} sm={12} md={8} lg={6} key={job._id}>
                <CardJob
                  nameJob={job.name}
                  company={job.companyId.name}
                  position={job.level}
                  logo={job.companyId.avatar}
                  location={job.location}
                  salary={`${(job.salary / 1_000_000).toFixed(0)} triệu`}
                  skills={job.skill}
                  quantity={job.quantity}
                  startDate={job.startDate}
                  endDate={job.endDate}
                />
              </Col>
            ))}
      </Row>
    </SectionLayout>
  );
};

export default TopJobsSection;
