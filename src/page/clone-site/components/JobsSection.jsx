import { Button, Tag, Avatar } from "antd";
import {
  EnvironmentOutlined,
  FireOutlined,
  RightOutlined,
} from "@ant-design/icons";

const JobsSection = () => {
  return (
    <section className="jobs-section">
      <div className="jobs-container">
        <h2 className="section-title">105 Việc làm IT cho Developer "Chất"</h2>

        <div className="jobs-grid">
          {/* Job 1 */}
          <div className="job-card">
            <div className="job-header">
              <div className="job-title-container">
                <h3 className="job-title">
                  Full Stack Developer / Java, ReactJS
                </h3>
                <Tag color="orange">Đăng 5 ngày trước</Tag>
              </div>
              <div className="company-logo">
                <Avatar src="/abstract-geometric-logo.png" />
              </div>
            </div>
            <div className="company-name">AITS Solution LLC</div>
            <div className="job-location">
              <EnvironmentOutlined /> Đường Láng, đi làm tại văn phòng, Đống Đa
            </div>
            <div className="job-salary">
              <FireOutlined className="salary-icon" />
              <span>Tới 35tr (gross)</span>
            </div>
            <div className="job-location">
              <EnvironmentOutlined /> Làm hybrid
            </div>
            <div className="job-skills">
              <Tag>Java</Tag>
              <Tag>Spring Boot</Tag>
              <Tag>ReactJS</Tag>
              <Tag>JavaScript</Tag>
              <Tag>Docker</Tag>
            </div>
          </div>

          {/* Job 2 */}
          <div className="job-card">
            <div className="job-header">
              <div className="job-title-container">
                <h3 className="job-title">
                  Senior Frontend Engineer (ReactJS)
                </h3>
                <Tag color="orange">Đăng 3 ngày trước</Tag>
              </div>
              <div className="company-logo">
                <Avatar src="/abstract-geometric-logo.png" />
              </div>
            </div>
            <div className="company-name">Jobhopin Vietnam</div>
            <div className="job-location">
              <EnvironmentOutlined /> Đường Láng, đi làm tại văn phòng, Đống Đa
            </div>
            <div className="job-salary">
              <FireOutlined className="salary-icon" />
              <span>Lương thỏa thuận</span>
            </div>
            <div className="job-location">
              <EnvironmentOutlined /> TP Hồ Chí Minh
            </div>
            <div className="job-skills">
              <Tag>ReactJS</Tag>
              <Tag>JavaScript</Tag>
              <Tag>HTML/CSS</Tag>
              <Tag>Redux</Tag>
              <Tag>TypeScript</Tag>
            </div>
          </div>

          {/* Job 3 */}
          <div className="job-card">
            <div className="job-header">
              <div className="job-title-container">
                <h3 className="job-title">
                  Front End Developer (JavaScript, ReactJS, VueJS)
                </h3>
                <Tag color="red">Đăng hôm nay</Tag>
              </div>
              <div className="company-logo">
                <Avatar src="/abstract-geometric-logo.png" />
              </div>
            </div>
            <div className="company-name">LOI OVN Tech Team</div>
            <div className="job-location">
              <EnvironmentOutlined /> Đường Láng, đi làm tại văn phòng, Đống Đa
            </div>
            <div className="job-salary">
              <FireOutlined className="salary-icon" />
              <span>Tới 30tr (gross)</span>
            </div>
            <div className="job-location">
              <EnvironmentOutlined /> Hà Nội
            </div>
            <div className="job-skills">
              <Tag>JavaScript</Tag>
              <Tag>ReactJS</Tag>
              <Tag>VueJS</Tag>
              <Tag>HTML/CSS</Tag>
              <Tag>REST API</Tag>
            </div>
          </div>

          {/* Job 4 */}
          <div className="job-card">
            <div className="job-header">
              <div className="job-title-container">
                <h3 className="job-title">
                  Sr Front-end Engineer (ReactJS, JavaScript)
                </h3>
                <Tag color="red">Đăng hôm nay</Tag>
              </div>
              <div className="company-logo">
                <Avatar src="/abstract-geometric-logo.png" />
              </div>
            </div>
            <div className="company-name">Westlake</div>
            <div className="job-location">
              <EnvironmentOutlined /> Đường Láng, đi làm tại văn phòng, Đống Đa
            </div>
            <div className="job-salary">
              <FireOutlined className="salary-icon" />
              <span>Lương thỏa thuận</span>
            </div>
            <div className="job-location">
              <EnvironmentOutlined /> TP Hồ Chí Minh
            </div>
            <div className="job-skills">
              <Tag>ReactJS</Tag>
              <Tag>JavaScript</Tag>
              <Tag>TypeScript</Tag>
              <Tag>NextJS</Tag>
              <Tag>Redux</Tag>
            </div>
          </div>
        </div>

        <div className="view-more-container">
          <Button className="view-more-button">
            Xem thêm 97 công việc khác <RightOutlined />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobsSection;
