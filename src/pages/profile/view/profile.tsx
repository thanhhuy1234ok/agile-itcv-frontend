import React, { useState, useEffect } from "react";
import { Row, Col, Menu, Typography, Card } from "antd";
import {
  UserOutlined,
  HeartOutlined,
  SettingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import ProfileInfo from "../component/Info";
import { useNavigate } from "react-router-dom";
import FavoriteList from "../component/Favorites";
import AccountSettings from "../component/Settings";
import { useCurrentApp } from "@/context/app.context";
import "@/styles/profile.style.scss";

const { Title } = Typography;

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useCurrentApp();
  const [selectedKey, setSelectedKey] = useState<string>("info");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKey(key);
  };

  const tabComponents: Record<string, JSX.Element> = {
    info: <ProfileInfo user={user} />,
    favorites: <FavoriteList />,
    settings: <AccountSettings />,
  };

  const menuItems = [
    { key: "info", icon: <UserOutlined />, label: "Thông tin cá nhân" },
    { key: "favorites", icon: <HeartOutlined />, label: "Đã thích" },
    { key: "settings", icon: <SettingOutlined />, label: "Cài đặt" },
  ];

  return (
    <div className="wrapper">
      <div className="content">
        <Title level={2}>Trang cá nhân</Title>

        <Row gutter={24}>
          <Col md={4}>
            <Card>
              <Title level={4} style={{ marginTop: 0 }}>
                <SmileOutlined style={{ color: "red", fontSize: 24 }} /> Xin
                chào {user?.name || "Khách"}!
              </Title>
              <Menu
                className="custom-profile-menu"
                mode="inline"
                selectedKeys={[selectedKey]}
                onClick={handleMenuClick}
                items={menuItems}
              />
            </Card>
          </Col>

          <Col xs={24} md={20}>
            {tabComponents[selectedKey]}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProfilePage;
