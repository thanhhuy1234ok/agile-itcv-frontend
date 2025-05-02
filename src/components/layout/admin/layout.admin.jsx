import { Layout, Menu, Button, Dropdown, Avatar, Breadcrumb, Badge } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/global/AuthenticationContext";
import { Outlet } from "react-router-dom";  
import "./style.layout.admin.scss";

const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const auth = useAuth() || {};
  const user = auth.user;
  const onLogout = auth.onLogout || (() => {});
  const navigate = useNavigate();
  const location = useLocation();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    const pathSnippets = location.pathname.split("/").filter((i) => i);
    const breadcrumbArray = [
      {
        title: "Trang chủ",
        path: "/",
      },
    ];

    if (pathSnippets.length > 0) {
      if (pathSnippets.includes("clone-site")) {
        breadcrumbArray.push({
          title: "Clone Site",
          path: "/admin/clone-site",
        });
      }
    }

    setBreadcrumbItems(breadcrumbArray);
  }, [location]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Thông tin cá nhân",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Cài đặt tài khoản",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: onLogout,
    },
  ];

  const notificationItems = [
    {
      key: "1",
      label: "Có 3 người dùng mới đăng ký",
    },
    {
      key: "2",
      label: "Cập nhật hệ thống mới",
    },
    {
      key: "3",
      label: "5 site mới được clone",
    },
  ];

  return (
    <Layout className="admin-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="admin-sider"
        width={260}
        theme="light"
      >
        <div
          className="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          {!collapsed ? (
            <span className="logo-text">Agile System</span>
          ) : (
            <span className="logo-icon">A</span>
          )}
        </div>

        {/* ✅ Menu đã được cập nhật để bỏ Clone Site */}
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          className="admin-menu"
          items={[
            {
              key: "/",
              icon: <HomeOutlined />,
              label: "Trang chủ",
            },
          ]}
        />

        <div className="sider-footer">
          {!collapsed && (
            <div className="sider-footer-content">
              <p>Phiên bản: 1.0.0</p>
              <p>© 2023 Agile System</p>
            </div>
          )}
        </div>
      </Sider>

      <Layout className="site-layout">
        <Header className="admin-header">
          <div className="header-left">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapsed}
              className="trigger-button"
            />
            <Breadcrumb className="breadcrumb-nav">
              {breadcrumbItems.map((item, index) => (
                <Breadcrumb.Item key={index}>
                  {index < breadcrumbItems.length - 1 ? (
                    <a onClick={() => navigate(item.path)}>{item.title}</a>
                  ) : (
                    item.title
                  )}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </div>

          <div className="header-right">
            <Dropdown
              menu={{ items: notificationItems }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Badge count={3} className="notification-badge">
                <Button
                  type="text"
                  icon={<BellOutlined />}
                  className="header-action-btn"
                />
              </Badge>
            </Dropdown>

            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <div className="user-info">
                <Avatar icon={<UserOutlined />} className="user-avatar" />
                {!collapsed && (
                  <span className="user-name">
                    {user?.name || "Người dùng"}
                  </span>
                )}
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content className="admin-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
