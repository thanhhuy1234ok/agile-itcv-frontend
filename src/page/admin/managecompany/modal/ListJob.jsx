import React from "react";
import { List, Typography, Tag, Space, Skeleton, Card } from "antd";

const { Text, Paragraph } = Typography;

const levelColorMap = {
  JUNIOR: "green",
  MID: "blue",
  SENIOR: "red",
};

const ListJob = ({ jobs, jobsLoading }) => {
  if (jobsLoading) {
    return <Skeleton active paragraph={{ rows: 4 }} />;
  }

  if (!jobs || jobs.length === 0) {
    return <Text type="secondary">Không có công việc nào.</Text>;
  }

  return (
    <div style={{ maxHeight: 600, overflowY: "auto", paddingRight: 8 }}>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={jobs}
        renderItem={(job) => (
          <List.Item key={job._id}>
            <Card hoverable>
              <Space direction="vertical" style={{ width: "100%" }}>
                <div>
                  <Text strong style={{ fontSize: 16, marginRight: 8 }}>
                    Tên công việc:
                  </Text>
                  <Text>{job.name}</Text>
                </div>

                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                  <Text strong style={{ marginRight: 8 }}>Kỹ năng:</Text>
                  {job.skill?.map((skill) => (
                    <Tag key={skill} color="cyan" style={{ marginBottom: 4 }}>
                      {skill}
                    </Tag>
                  ))}
                </div>

                <div>
                  <Text strong style={{ marginRight: 8 }}>Cấp độ:</Text>
                  <Tag color={levelColorMap[job.level?.toUpperCase()] || "default"}>
                    {job.level}
                  </Tag>
                </div>

                <div>
                  <Text strong style={{ marginRight: 8 }}>Khu vực:</Text>
                  <Text type="secondary">{job.location}</Text>
                </div>

                <div>
                  <Text strong style={{ marginRight: 8 }}>Lương:</Text>
                  <Text style={{ color: "#1890ff" }}>
                    {job.salary?.toLocaleString()} VND
                  </Text>
                </div>

                <div>
                  <Text strong style={{ marginRight: 8 }}>Mô tả:</Text>
                  <Paragraph
                    ellipsis={{ rows: 3, expandable: true, symbol: "Xem thêm" }}
                    style={{ marginBottom: 0 }}
                  >
                    {job.description}
                  </Paragraph>
                </div>
              </Space>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ListJob;
