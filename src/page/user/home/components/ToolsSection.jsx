import { Button, Tag } from "antd";

const ToolsSection = () => {
  return (
    <section className="tools-section">
      <div className="tools-container">
        <h2 className="section-title">
          Công cụ tốt nhất cho hành trình ứng tuyển của bạn
        </h2>

        <div className="tools-grid">
          <div className="tool-card">
            <div className="tool-icon">
              <img src="/document-with-checkmark.png" alt="Hồ sơ cá nhân" />
            </div>
            <div className="tool-content">
              <h3 className="tool-title">Hồ sơ cá nhân</h3>
              <p className="tool-description">
                Xây dựng hồ sơ IT chuyên nghiệp, nổi bật, thu hút nhà tuyển dụng
                săn đón bạn
              </p>
              <Button className="tool-button">Tạo ngay hồ sơ</Button>
            </div>
          </div>

          <div className="tool-card">
            <div className="tool-icon">
              <img src="/stylized-cv-icon.png" alt="Mẫu CV" />
            </div>
            <div className="tool-content">
              <h3 className="tool-title">
                Mẫu CV <Tag color="green">Mới</Tag>
              </h3>
              <p className="tool-description">
                Nhiều mẫu CV đẹp, thiết kế cho IT chuyên nghiệp - Xuất sang PDF
                hoặc tải xuống
              </p>
              <Button className="tool-button">Xem mẫu CV</Button>
            </div>
          </div>

          <div className="tool-card">
            <div className="tool-icon">
              <img src="/abstract-company-symbol.png" alt="Công ty IT" />
            </div>
            <div className="tool-content">
              <h3 className="tool-title">Công ty IT</h3>
              <p className="tool-description">
                Tìm hiểu thông tin công ty, lương thưởng, nghề nghiệp và môi
                trường làm việc
              </p>
              <Button className="tool-button">Khám phá ngay</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
