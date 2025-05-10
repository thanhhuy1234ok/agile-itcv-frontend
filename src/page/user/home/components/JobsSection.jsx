import { Button, Tag, Avatar } from "antd";
import {
  EnvironmentOutlined,
  FireOutlined,
  RightOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { FORMATE_DATE_VN } from '@/utils/format.time';

const JobsSection = ({ jobs }) => {
  return (
    <section className="jobs-section">
      <div className="jobs-container">
        <h2 className="section-title">105 Việc làm IT cho Developer "Chất"</h2>

        <div className="jobs-grid">
          {jobs.map((job) => (
            <div key={job._id} className="job-card">
              <div className="job-header">
                <div className="job-title-container">
                  <h3 className="job-title">{job.name}</h3>
                  <Tag color="orange">Từ ngày {dayjs(job.startDate).format(FORMATE_DATE_VN)}</Tag>
                </div>
                <div className="company-logo">
                  <Avatar src="/abstract-geometric-logo.png" />
                </div>
              </div>

              <div className="company-name">{job.companyId.name}</div>

              <div className="job-location">
                <EnvironmentOutlined /> {job.companyId.address}
              </div>

              <div className="job-salary">
                <FireOutlined className="salary-icon" />
                <span>{job.salary.toLocaleString("vi-VN")} VND</span>
              </div>

              <div className="job-skills">
                {job.skill.map((s, index) => (
                  <Tag key={index}>{s}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="view-more-container">
          <Button className="view-more-button">
            Xem thêm các công việc khác <RightOutlined />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobsSection;
