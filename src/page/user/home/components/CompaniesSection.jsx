import { StarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";

const CompaniesSection = ({ companies, loading }) => {
  if (loading) {
    return <div className="loading-message">Đang tải công ty...</div>;
  }

  return (
    <section className="companies-section">
      <div className="companies-container">
        <h2 className="section-title">Nhà tuyển dụng hàng đầu</h2>

        <div className="companies-grid">
          {companies.map((company) => (
            <div key={company._id} className="company-card">
              <div className="company-logo">
                <img src={company.logo} alt={company.name} />
              </div>
              <h3 className="company-name">{company.name}</h3>
              <div className="company-location">
                <EnvironmentOutlined /> {company.address}
              </div>
              <div className="company-description"><ReactMarkdown>{company.description}</ReactMarkdown></div>
              <div className="company-rating">
                <StarOutlined className="star-icon" />
                <span>4.0</span>
                <span className="rating-count">(5)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
