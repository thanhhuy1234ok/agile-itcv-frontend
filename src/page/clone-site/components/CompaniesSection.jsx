import { Tag } from "antd";
import { StarOutlined, EnvironmentOutlined } from "@ant-design/icons";

const CompaniesSection = () => {
  return (
    <section className="companies-section">
      <div className="companies-container">
        <h2 className="section-title">Nhà tuyển dụng hàng đầu</h2>

        <div className="companies-grid">
          {/* Company 1 */}
          <div className="company-card">
            <div className="company-logo">
              <img
                src="/interconnected-innovation.png"
                alt="Scandinavian Software Park"
              />
            </div>
            <h3 className="company-name">Scandinavian Software Park</h3>
            <div className="company-tags">
              <Tag>C#</Tag>
              <Tag>JavaScript</Tag>
              <Tag>Java</Tag>
              <Tag>QA/QC</Tag>
              <Tag>PHP</Tag>
            </div>
            <div className="company-location">
              <EnvironmentOutlined /> Hà Nội
            </div>
            <div className="company-rating">
              <StarOutlined className="star-icon" />
              <span>4.0</span>
              <span className="rating-count">(5)</span>
            </div>
          </div>

          {/* Company 2 */}
          <div className="company-card">
            <div className="company-logo">
              <img
                src="/bosch-logo-generic.png"
                alt="Bosch Global Software Technologies"
              />
            </div>
            <h3 className="company-name">
              Bosch Global Software Technologies Company Limited
            </h3>
            <div className="company-tags">
              <Tag>Embedded</Tag>
              <Tag>C/C++</Tag>
              <Tag>Java</Tag>
              <Tag>.NET</Tag>
              <Tag>SAP</Tag>
            </div>
            <div className="company-location">
              <EnvironmentOutlined /> TP Hồ Chí Minh, Hà Nội
            </div>
            <div className="company-rating">
              <StarOutlined className="star-icon" />
              <span>4.0</span>
              <span className="rating-count">(9)</span>
            </div>
          </div>

          {/* Company 3 */}
          <div className="company-card">
            <div className="company-logo">
              <img src="/stylized-mb-logo.png" alt="MB Bank" />
            </div>
            <h3 className="company-name">MB Bank</h3>
            <div className="company-tags">
              <Tag>Java</Tag>
              <Tag>JavaScript</Tag>
              <Tag>Python</Tag>
              <Tag>Angular/JS</Tag>
              <Tag>ReactJS</Tag>
            </div>
            <div className="company-location">
              <EnvironmentOutlined /> Hà Nội, TP Hồ Chí Minh
            </div>
            <div className="company-rating">
              <StarOutlined className="star-icon" />
              <span>3.9</span>
              <span className="rating-count">(5)</span>
            </div>
          </div>

          {/* Company 4 */}
          <div className="company-card">
            <div className="company-logo">
              <img src="/stylized-hero-emblem.png" alt="Employment Hero" />
            </div>
            <h3 className="company-name">Employment Hero</h3>
            <div className="company-tags">
              <Tag>PHP</Tag>
              <Tag>AWS</Tag>
              <Tag>Ruby on Rails</Tag>
              <Tag>Python</Tag>
              <Tag>React Native</Tag>
            </div>
            <div className="company-location">
              <EnvironmentOutlined /> TP Hồ Chí Minh
            </div>
            <div className="company-rating">
              <StarOutlined className="star-icon" />
              <span>4.0</span>
              <span className="rating-count">(5)</span>
            </div>
          </div>

          {/* Company 5 */}
          <div className="company-card">
            <div className="company-logo">
              <img src="/raksul-logo-concept.png" alt="RAKSUL Vietnam" />
            </div>
            <h3 className="company-name">RAKSUL Vietnam</h3>
            <div className="company-tags">
              <Tag>Ruby</Tag>
              <Tag>Ruby on Rails</Tag>
              <Tag>PHP</Tag>
              <Tag>Front-End</Tag>
              <Tag>NodeJS</Tag>
            </div>
            <div className="company-location">
              <EnvironmentOutlined /> TP Hồ Chí Minh
            </div>
            <div className="company-rating">
              <StarOutlined className="star-icon" />
              <span>4.0</span>
              <span className="rating-count">(5)</span>
            </div>
          </div>

          {/* Company 6 */}
          <div className="company-card">
            <div className="company-logo">
              <img src="/abstract-tech-logo.png" alt="FPT Software" />
            </div>
            <h3 className="company-name">FPT Software</h3>
            <div className="company-tags">
              <Tag>Java</Tag>
              <Tag>C++</Tag>
              <Tag>English</Tag>
              <Tag>Android</Tag>
              <Tag>iOS</Tag>
            </div>
            <div className="company-location">
              <EnvironmentOutlined /> Hà Nội
            </div>
            <div className="company-rating">
              <StarOutlined className="star-icon" />
              <span>3.9</span>
              <span className="rating-count">(5)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
