"use client";

import { Button, Row, Col, Card, Typography, Layout, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import {
  DatabaseOutlined,
  CopyOutlined,
  UserOutlined,
  HomeOutlined,
  RocketOutlined,
  SettingOutlined,
  TeamOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import "../home/Home.style.css";

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigateToCloneSite = () => {
    navigate("/admin/clone-site");
  };

  const handleNavigateToAdminPanel = () => {
    navigate("/admin/admin-panel");
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  const features = [
    {
      icon: <RocketOutlined />,
      title: "Tốc độ nhanh chóng",
      description:
        "Hệ thống được tối ưu hóa để đảm bảo tốc độ và hiệu suất cao",
    },
    {
      icon: <SettingOutlined />,
      title: "Dễ dàng tùy chỉnh",
      description: "Tùy chỉnh giao diện và chức năng theo nhu cầu của bạn",
    },
    {
      icon: <TeamOutlined />,
      title: "Hỗ trợ đa người dùng",
      description: "Quản lý nhiều người dùng với các quyền khác nhau",
    },
    {
      icon: <BulbOutlined />,
      title: "Thông minh & Trực quan",
      description: "Giao diện người dùng thông minh và trực quan, dễ sử dụng",
    },
  ];

  return (
    <Layout className="home-layout">
      <Header className="home-header">
        <div className="header-container">
          <div className="logo">Agile System</div>
          <div className="header-actions">
            <Button
              type="link"
              icon={<HomeOutlined />}
              onClick={() => navigate("/")}>
              Trang chủ
            </Button>
            <Button
              type="primary"
              icon={<UserOutlined />}
              onClick={handleNavigateToLogin}>
              Đăng nhập
            </Button>
          </div>
        </div>
      </Header>

      <Content className="home-content">
        <section className="hero-section">
          <div className="container">
            <Row gutter={[48, 24]} align="middle">
              <Col xs={24} md={12}>
                <div className="hero-content">
                  <Title level={1} className="hero-title">
                    Hệ thống quản lý{" "}
                    <span className="highlight">thông minh</span>
                  </Title>
                  <Paragraph className="hero-description">
                    Giải pháp toàn diện giúp bạn quản lý và clone website một
                    cách hiệu quả. Tối ưu hóa quy trình làm việc và nâng cao
                    năng suất.
                  </Paragraph>
                  <div className="hero-buttons">
                    <Button
                      type="primary"
                      size="large"
                      onClick={handleNavigateToLogin}>
                      Bắt đầu ngay
                    </Button>
                    <Button size="large">Tìm hiểu thêm</Button>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className="hero-image">
                  <img
                    src="/data-driven-insights.png"
                    alt="Dashboard Analytics"
                  />
                </div>
              </Col>
            </Row>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <Title level={2} className="section-title">
              Tính năng nổi bật
            </Title>
            <Paragraph className="section-description">
              Khám phá các tính năng mạnh mẽ giúp bạn quản lý hệ thống hiệu quả
            </Paragraph>

            <Row gutter={[24, 24]} className="features-grid">
              {features.map((feature, index) => (
                <Col xs={24} sm={12} md={6} key={index}>
                  <Card className="feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <Title level={4}>{feature.title}</Title>
                    <Paragraph>{feature.description}</Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        <section className="modules-section">
          <div className="container">
            <Title level={2} className="section-title">
              Các module chính
            </Title>
            <Paragraph className="section-description">
              Chọn một trong các module dưới đây để tiếp tục
            </Paragraph>

            <Row gutter={[24, 24]} className="modules-grid">
              <Col xs={24} md={12}>
                <Card
                  hoverable
                  className="module-card"
                  onClick={handleNavigateToCloneSite}>
                  <div className="module-content">
                    <div className="module-icon">
                      <Avatar
                        size={64}
                        icon={<CopyOutlined />}
                        className="icon-clone"
                      />
                    </div>
                    <div className="module-info">
                      <Title level={3}>Clone Site</Title>
                      <Paragraph>
                        Sao chép và quản lý các trang web từ nguồn bên ngoài.
                        Xem bản clone của ITViec và các trang web khác.
                      </Paragraph>
                      <Button
                        type="primary"
                        size="large"
                        icon={<CopyOutlined />}>
                        Truy cập Clone Site
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col xs={24} md={12}>
                <Card
                  hoverable
                  className="module-card"
                  onClick={handleNavigateToAdminPanel}>
                  <div className="module-content">
                    <div className="module-icon">
                      <Avatar
                        size={64}
                        icon={<DatabaseOutlined />}
                        className="icon-admin"
                      />
                    </div>
                    <div className="module-info">
                      <Title level={3}>Admin Panel</Title>
                      <Paragraph>
                        Quản lý hệ thống và cấu hình các tùy chọn nâng cao. Theo
                        dõi người dùng và hoạt động.
                      </Paragraph>
                      <Button
                        type="primary"
                        size="large"
                        icon={<DatabaseOutlined />}>
                        Truy cập Admin Panel
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </section>
      </Content>

      <Footer className="home-footer">
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-logo">Agile System</div>
            <Paragraph>Hệ thống quản lý và clone website hiệu quả</Paragraph>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <Title level={5}>Sản phẩm</Title>
              <ul>
                <li>
                  <a href="#">Clone Site</a>
                </li>
                <li>
                  <a href="#">Admin Panel</a>
                </li>
                <li>
                  <a href="#">Tính năng</a>
                </li>
              </ul>
            </div>
            <div className="link-group">
              <Title level={5}>Công ty</Title>
              <ul>
                <li>
                  <a href="#">Về chúng tôi</a>
                </li>
                <li>
                  <a href="#">Liên hệ</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
            </div>
            <div className="link-group">
              <Title level={5}>Hỗ trợ</Title>
              <ul>
                <li>
                  <a href="#">Trung tâm hỗ trợ</a>
                </li>
                <li>
                  <a href="#">Tài liệu</a>
                </li>
                <li>
                  <a href="#">Cộng đồng</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="copyright">
            Agile System ©{new Date().getFullYear()} - Hệ thống quản lý và clone
            website
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default HomePage;
