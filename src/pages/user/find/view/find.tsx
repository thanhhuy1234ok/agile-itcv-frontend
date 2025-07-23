import React, { useEffect, useState } from "react";
import { Typography, Spin, Pagination, Row, Col, Card } from "antd";
import JobSearchBanner from "@/components/share/JobSearchBanner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import type { IJob } from "@/types/job";
import { getJobs } from "@/services/api";
import { useSearchParams } from "react-router-dom";

const { Title } = Typography;
dayjs.extend(relativeTime);
dayjs.locale("vi");

const FindPage = () => {
  const [searchParams] = useSearchParams();
  const skill = searchParams.get("skill") || "";
  const location = searchParams.get("location") || "";

  const [jobs, setJobs] = useState<IJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    pages: 1,
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {
        skill,
        location,
        current: pagination.current,
        pageSize: pagination.pageSize,
      };

      const res = await getJobs(params);
      const jobList = res.data?.data?.result?.data || [];
      const meta = res.data?.data?.result?.meta || {
        current: 1,
        pageSize: 10,
        total: 0,
        pages: 1,
      };

      setJobs(jobList);
      setPagination({
        current: meta.current,
        pageSize: meta.pageSize,
        total: meta.total,
        pages: meta.pages,
      });

      if (jobList.length > 0) setSelectedJob(jobList[0]);
    } catch (err) {
      console.error("Lỗi khi fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [skill, location, pagination.current, pagination.pageSize]);

  return (
    <div>
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
                    <Card
                      title={
                        <span style={{ color: "gray" }}>
                          Đã đăng {dayjs(job.createdAt).fromNow()}
                        </span>
                      }
                      key={job._id}
                      style={{
                        marginBottom: 16,
                        cursor: "pointer",
                        border:
                          selectedJob?._id === job._id
                            ? "3px solid red"
                            : "1px solid #f0f0f0",
                        boxShadow:
                          selectedJob?._id === job._id
                            ? "0 6px 20px rgba(0, 0, 0, 0.25)"
                            : "0 2px 8px rgba(0, 0, 0, 0.1)",
                        transition: "all 0.1s ease",
                      }}
                      onClick={() => setSelectedJob(job)}
                    >
                      <Title level={5} style={{ marginTop: 0 }}>
                        {job.name}
                      </Title>
                      <p>{job.name}</p>
                      <p>{job.location}</p>
                    </Card>
                  ))}
                </Col>

                <Col span={14}>
                  {selectedJob && (
                    <Card
                      style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
                      title="Chi tiết công việc"
                      bordered
                    >
                      <p>
                        <strong>Công việc:</strong> {selectedJob.name}
                      </p>
                      <p>
                        <strong>Công ty:</strong> {selectedJob.companyId.name}
                      </p>
                      <p>
                        <strong>Địa điểm:</strong> {selectedJob.location}
                      </p>
                      <p>
                        <strong>Mô tả:</strong> {selectedJob.description}
                      </p>
                    </Card>
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
                  onChange={(page, pageSize) => {
                    setPagination((prev) => ({
                      ...prev,
                      current: page,
                      pageSize,
                    }));
                  }}
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
