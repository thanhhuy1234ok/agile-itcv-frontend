import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, message, Avatar, Image } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useCurrentApp } from "@/context/app.context";
import CustomDropdown from "@/components/share/customDropdown";
import type { MenuProps } from "antd";
// import "@/styles/style.scss"

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, onLogout } = useCurrentApp();

  const isLoginPage = location.pathname === "/login";

  const [language, setLanguage] = useState<"EN" | "VI">("VI");

  const onClick: MenuProps["onClick"] = ({ key }) => {
    message.info(`Clicked on item ${key}`);
  };

  const items1: MenuProps["items"] = [
    {
      label: "Việc làm IT theo kỹ năng",
      key: "/kn",
      children: [
        { label: "JavaScript", key: "/kn/js" },
        { label: "ReactJS", key: "/kn/react" },
        { label: "Python", key: "/kn/python" },
      ],
    },
    {
      label: "Việc làm IT theo cấp bậc",
      key: "/cb",
      children: [
        { label: "Intern", key: "/cb/intern" },
        { label: "Junior", key: "/cb/junior" },
        { label: "Senior", key: "/cb/senior" },
      ],
    },
    {
      label: "Việc làm IT theo công ty",
      key: "/cty",
      children: [
        { label: "FPT Software", key: "/cty/fpt" },
        { label: "VNG Corporation", key: "/cty/vng" },
        { label: "TMA Solutions", key: "/cty/tma" },
      ],
    },
    {
      label: "Việc làm IT theo thành phố",
      key: "/tp",
      children: [
        { label: "Hồ Chí Minh", key: "/tp/hcm" },
        { label: "Hà Nội", key: "/tp/hn" },
        { label: "Đà Nẵng", key: "/tp/dn" },
      ],
    },
  ];

  const items2: MenuProps["items"] = [
    {
      label: "Theo quy mô",
      key: "/company/size",
      children: [
        { label: "Doanh nghiệp lớn", key: "/company/size/large" },
        { label: "Startup", key: "/company/size/startup" },
        { label: "Vừa và nhỏ", key: "/company/size/sme" },
      ],
    },
    {
      label: "Theo lĩnh vực",
      key: "/company/field",
      children: [
        { label: "Fintech", key: "/company/field/fintech" },
        { label: "E-commerce", key: "/company/field/ecommerce" },
        { label: "AI & Data", key: "/company/field/ai" },
      ],
    },
    {
      label: "Theo vị trí",
      key: "/company/location",
      children: [
        { label: "Hồ Chí Minh", key: "/company/location/hcm" },
        { label: "Hà Nội", key: "/company/location/hn" },
        { label: "Đà Nẵng", key: "/company/location/dn" },
      ],
    },
  ];

  const items3: MenuProps["items"] = [
    { label: "Tất cả blog", key: "/blog" },
    { label: "Chia sẻ kinh nghiệm", key: "/blog/kinh-nghiem" },
    { label: "Tin tuyển dụng", key: "/blog/tuyen-dung" },
    { label: "Phát triển sự nghiệp", key: "/blog/su-nghiep" },
    { label: "Kỹ thuật lập trình", key: "/blog/code" },
  ];

  return (
    <div
      style={{
        background: "linear-gradient(to right, #000000, #a32020)",
        padding: "20px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "0.5px solid #a6a6a6",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <Image
            width={100}
            src="https://itviec.com/assets/logo-itviec-4492a2f2577a15a0a1d55444c21c0fa55810822b3b189fc689b450fb62ce0b5b.png"
          />
        </div>

        <CustomDropdown
          items={items1}
          onClick={onClick}
          label="Việc làm IT"
          color="#a6a6a6"
        />
        <CustomDropdown
          items={items2}
          onClick={onClick}
          label="Top công ty IT"
          color="#a6a6a6"
        />
        <CustomDropdown
          items={items3}
          onClick={onClick}
          label="Blog"
          color="#a6a6a6"
        />
        <a className="cv-link">
          <span className="cv-text">Mẫu CV IT</span>
          <span className="badge-hot">HOT</span>
        </a>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        {!isLoginPage &&
          (isAuthenticated && user ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <CustomDropdown
                items={[
                  { label: "Thông tin tài khoản", key: "profile" },
                  { label: "Đăng xuất", key: "logout" },
                ]}
                onClick={({ key }) => {
                  if (key === "logout") onLogout();
                }}
                label={
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Avatar
                      src={user.avatar}
                      size={40}
                      style={{
                        border: "0.5px solid white",
                        boxSizing: "border-box",
                      }}
                    />
                    <DownOutlined
                      style={{
                        position: "absolute",
                        bottom: -3,
                        right: -2,
                        fontSize: 10,
                        color: "black",
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                        padding: 2,
                      }}
                    />
                  </div>
                }
              />
            </div>
          ) : (
            <a className="login-link" href="/login">
              Đăng nhập/Đăng ký
            </a>
          ))}
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <Button
            type="link"
            style={{
              color: language === "EN" ? "#fff" : "#a6a6a6",
              fontSize: 16,
              margin: 0,
              padding: 0,
            }}
            onClick={() => setLanguage("EN")}
          >
            EN
          </Button>
          <span style={{ color: "#fff", margin: "0 5px" }}>|</span>
          <Button
            type="link"
            style={{
              color: language === "VI" ? "#fff" : "#a6a6a6",
              fontSize: 16,
              margin: 0,
              padding: 0,
            }}
            onClick={() => setLanguage("VI")}
          >
            VI
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
