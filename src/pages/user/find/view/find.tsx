import React from "react";
import {
  Typography,
  Spin,
  Pagination,
  Row,
  Col,
  Card,
  Avatar,
  Button,
} from "antd";
import JobSearchBanner from "@/components/share/JobSearchBanner";
import JobCard from "../component/jobCard";
import { DollarOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { useFind } from "@/pages/user/find/viewmodal/useFind";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import { useCurrentApp } from "@/context/app.context";
import "dayjs/locale/vi";

const { Title, Text } = Typography;
dayjs.extend(relativeTime);
dayjs.locale("vi");

const FindPage = () => {
  const navigate = useNavigate();
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
                    <Card
                      style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
                      title={<Title level={3}>Chi tiết công việc</Title>}
                      bordered
                    >
                      <div style={{ marginBottom: 12 }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: 8,
                          }}
                        >
                          <div>
                            <Avatar
                              style={{
                                border: "1px solid black",
                                borderRadius: 4,
                              }}
                              size={80}
                              src={selectedJob.companyId.avatar}
                            />
                          </div>

                          <div style={{ paddingLeft: 15, fontSize: 16 }}>
                            <div>
                              <Text style={{ fontSize: 16 }}>
                                {selectedJob.name}
                              </Text>
                            </div>
                            <div>
                              <Text style={{ fontSize: 16 }}>
                                {selectedJob.companyId.name}
                              </Text>
                            </div>
                            <div>
                              {isAuthenticated ? (
                                <span style={{ color: "#0ab305" }}>
                                  <DollarOutlined style={{ marginRight: 4 }} />
                                  {(selectedJob.salary / 1_000_000).toFixed(
                                    0
                                  )}{" "}
                                  triệu
                                </span>
                              ) : (
                                <span
                                  style={{
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                    color: "black",
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate("/login");
                                  }}
                                >
                                  Vui lòng đăng nhập để xem lương
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          style={{
                            width: "100%",
                            backgroundColor: "red",
                            color: "white",
                            fontSize: 16,
                          }}
                        >
                          ỨNG TUYỂN NGAY
                        </Button>
                      </div>
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
