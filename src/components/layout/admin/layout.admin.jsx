import {
  Layout,
  Menu,
  Button,
  Dropdown,
  Avatar,
  Breadcrumb,
  Badge,
} from "antd";
import {
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/global/AuthenticationContext";
import { Outlet } from "react-router-dom";
import "./style.layout.admin.scss";

const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, onLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  useEffect(() => {
    const pathSnippets = location.pathname.split("/").filter(Boolean);
    const breadcrumbArray = [{ title: "Trang chủ", path: "/admin" }];

    if (pathSnippets.includes("manage-user")) {
      breadcrumbArray.push({ title: "Quản lý người dùng", path: "/admin/manage-user" });
    }

    setBreadcrumbItems(breadcrumbArray);
  }, [location]);

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      onLogout();
    } else {
      navigate(key);
    }
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
          onClick={() => navigate("/admin")}
          style={{ cursor: "pointer" }}
        >
          {!collapsed ? (
            <span className="logo-text">Agile System</span>
          ) : (
            <span className="logo-icon">A</span>
          )}
        </div>

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          items={[
            { key: "/admin", icon: <HomeOutlined />, label: "Trang chủ" },
            { key: "/admin/manage-user", icon: <TeamOutlined />, label: "Quản lý người dùng" },
            { key: "/admin/manage-job", icon: <TeamOutlined />, label: "Quản lý công việc" },
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
            <Breadcrumb className="breadcrumb-nav" 
            items={breadcrumbItems.map((item, index) => ({
              title: index < breadcrumbItems.length - 1 ? 
                    <a onClick={() => navigate(item.path)}>{item.title}</a> 
                    : item.title,
              key: index
            }))} />
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
              menu={{ items: userMenuItems, onClick: handleMenuClick }}
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
