import React from "react";
import { Typography, Spin, Pagination, Row, Col } from "antd";
import JobSearchBanner from "@/components/share/JobSearchBanner";
import JobCard from "../component/jobCard";
import JobDetailCard from "../component/jobDetailCard";
import { useSearchParams } from "react-router-dom";
import { useFind } from "@/pages/user/find/viewmodal/useFind";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useCurrentApp } from "@/context/app.context";
import "dayjs/locale/vi";

const { Title } = Typography;
dayjs.extend(relativeTime);
dayjs.locale("vi");

const FindPage = () => {
  const { isAuthenticated } = useCurrentApp();
  const [searchParams] = useSearchParams();
  const skill = searchParams.get("skill") || "";
  const location = searchParams.get("location") || "";

  const {
    jobs,
    selectedJob,
    setSelectedJob,
    loading,
    pagination,
    setPagination,
  } = useFind({ skill, location });

  return (
    <div className="find-contaniner">
      <JobSearchBanner />
      <div className="wrapper">
        <div className="content">
          {loading ? (
            <Spin size="large" />
          ) : (
            <>
              <Title level={3} style={{ textAlign: "left" }}>
                Có {pagination.total} công việc{" "}
                {skill ? `cho kỹ năng "${skill}"` : ""}{" "}
                {location ? `tại ${location}` : "tại Việt Nam"}
              </Title>

              <Row gutter={24}>
                <Col span={10}>
                  {jobs.map((job) => (
                    <JobCard
                      key={job._id}
                      job={job}
                      selected={selectedJob?._id === job._id}
                      onClick={() => setSelectedJob(job)}
                    />
                  ))}
                </Col>

                <Col span={14}>
                  {selectedJob && (
                    <JobDetailCard
                      selectedJob={selectedJob}
                      isAuthenticated={isAuthenticated}
                    />
                  )}
                </Col>
              </Row>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                  current={pagination.current}
                  pageSize={pagination.pageSize}
                  total={pagination.total}
                  showSizeChanger={true}
                  pageSizeOptions={["5", "10", "20", "50"]}
                  onChange={(page, pageSize) =>
                    setPagination((prev) => ({
                      ...prev,
                      current: page,
                      pageSize,
                    }))
                  }
                  className="custom-pagination"
                  style={{ marginTop: 24, textAlign: "center" }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindPage;
