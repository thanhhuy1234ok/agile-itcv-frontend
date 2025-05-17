import {
    EnvironmentOutlined,
    HomeOutlined,
    DatabaseOutlined,
  } from "@ant-design/icons";
  import { Link } from "react-router-dom";
  
  const Footer = () => {
    const PhoneOutlined = () => <i className="fas fa-phone"></i>;
    const MailOutlined = () => <i className="fas fa-envelope"></i>;
    const GlobalOutlined = () => <i className="fas fa-globe"></i>;
    const FacebookOutlined = () => <i className="fab fa-facebook-f"></i>;
    const LinkedinOutlined = () => <i className="fab fa-linkedin-in"></i>;
    const YoutubeOutlined = () => <i className="fab fa-youtube"></i>;
  
    return (
      <footer className="itviec-footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-logo">
              <span className="logo-text">
                IT<span className="logo-highlight">Viec</span>
              </span>
            </div>
            <div className="footer-columns">
              <div className="footer-column">
                <h3 className="footer-title">Về ITviec</h3>
                <ul className="footer-links">
                  <li>
                    <a href="#">Trang chủ</a>
                  </li>
                  <li>
                    <a href="#">Việc làm IT</a>
                  </li>
                  <li>
                    <a href="#">Top công ty IT</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Cẩm nang tìm việc</a>
                  </li>
                </ul>
              </div>
  
              <div className="footer-column">
                <h3 className="footer-title">Chương trình</h3>
                <ul className="footer-links">
                  <li>
                    <a href="#">Việc làm IT</a>
                  </li>
                  <li>
                    <a href="#">Việc làm 1-1 với nhà tuyển dụng</a>
                  </li>
                  <li>
                    <a href="#">Việc làm từ xa</a>
                  </li>
                  <li>
                    <a href="#">Việc làm AI</a>
                  </li>
                </ul>
              </div>
  
              <div className="footer-column">
                <h3 className="footer-title">Điều khoản chung</h3>
                <ul className="footer-links">
                  <li>
                    <a href="#">Quy định bảo mật</a>
                  </li>
                  <li>
                    <a href="#">Quy chế hoạt động</a>
                  </li>
                  <li>
                    <a href="#">Giải quyết khiếu nại</a>
                  </li>
                  <li>
                    <a href="#">Thỏa thuận sử dụng</a>
                  </li>
                </ul>
              </div>
  
              <div className="footer-column">
                <h3 className="footer-title">Liên hệ để đăng tin tuyển dụng</h3>
                <ul className="footer-contact">
                  <li>
                    <EnvironmentOutlined /> Lầu 3, Tòa nhà Jabes 1, 244 Cống
                    Quỳnh, Phường Phạm Ngũ Lão, Quận 1, TP HCM
                  </li>
                  <li>
                    <PhoneOutlined /> (028) 3925 1183
                  </li>
                  <li>
                    <MailOutlined /> sales@itviec.com
                  </li>
                  <li>
                    <GlobalOutlined /> www.itviec.com
                  </li>
                </ul>
              </div>
            </div>
          </div>
  
          <div className="footer-bottom">
            <p className="copyright">
              Copyright © IT VIEC JSC. | MST: 0312192258
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <FacebookOutlined />
              </a>
              <a href="#" className="social-link">
                <LinkedinOutlined />
              </a>
              <a href="#" className="social-link">
                <YoutubeOutlined />
              </a>
            </div>
          </div>
  
          {/* Navigation to other pages */}
          <div className="admin-navigation">
            <h3 className="admin-nav-title">Điều hướng hệ thống</h3>
            <div className="admin-nav-links">
              <Link to="/" className="admin-nav-link">
                <HomeOutlined />
                Trang chủ
              </Link>
              <Link to="/admin/admin-panel" className="admin-nav-link">
                <DatabaseOutlined />
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  