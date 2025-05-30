"use client";

import { useState, useRef, useEffect, use } from "react";
import { Avatar, Button, Dropdown } from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  CaretDownOutlined,
  RightOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/global/AuthenticationContext";
import { jobNavigationMenu } from "@/data/job-categories";
// import "./Style.Header.scss";
import '@/styles/Header.scss'
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const { user, onLogout, detailUser } = useAuth();
  const dropdownRef = useRef(null);
  const submenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        submenuRef.current &&
        !submenuRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (dropdownId) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
    setActiveSubmenu(null);
  };

  const handleSubmenuToggle = (submenuId) => {
    setActiveSubmenu(submenuId);
  };

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      onLogout();
      navigate("/")
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
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
    },
  ];

  const renderSubmenu = (submenu) => {
    if (!submenu) return null;

    return (
      <div
        className={`submenu-panel ${activeSubmenu === submenu.id ? "active" : ""
          }`}
        ref={submenuRef}>
        <div className="submenu-header">
          <h3>{submenu.title}</h3>
          <a href={submenu.path} className="view-all">
            Xem tất cả <RightOutlined />
          </a>
        </div>
        <div className="submenu-content">
          {submenu.items.map((item) => (
            <a
              key={item.id}
              href={`${submenu.path}/${item.id}`}
              className="submenu-item">
              {item.name}
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Header */}
      <header className={`itviec-header`}>
        <div className="header-container">
          <div className="logo" style={{ cursor: "pointer" }} onClick={() => window.location.href = "/"}>
            <span className="logo-text">
              IT<span className="logo-highlight">Viec</span>
            </span>
          </div>
          <nav className="main-nav">
            <div className="nav-item-wrapper" ref={dropdownRef}>
              <a
                href="#"
                className={`nav-item ${activeDropdown === "jobs" ? "active" : ""
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdownToggle("jobs");
                }}>
                Việc làm IT <CaretDownOutlined className="dropdown-icon" />
              </a>

              {activeDropdown === "jobs" && (
                <div className="dropdown-menu">
                  {jobNavigationMenu.map((menu) => (
                    <a
                      key={menu.id}
                      href={menu.path}
                      className={`dropdown-item ${activeSubmenu === menu.id ? "active" : ""
                        }`}
                      onMouseEnter={() => handleSubmenuToggle(menu.id)}>
                      {menu.title} <RightOutlined className="submenu-icon" />
                    </a>
                  ))}

                  {renderSubmenu(
                    jobNavigationMenu.find((menu) => menu.id === activeSubmenu)
                  )}
                </div>
              )}
            </div>

            <div className="nav-item-wrapper">
              <a
                href="#"
                className={`nav-item ${activeDropdown === "companies" ? "active" : ""
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdownToggle("companies");
                }}>
                Top Công Ty IT <CaretDownOutlined className="dropdown-icon" />
              </a>
            </div>

            <div className="nav-item-wrapper">
              <a
                href="#"
                className={`nav-item ${activeDropdown === "blog" ? "active" : ""
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdownToggle("blog");
                }}>
                Blog <CaretDownOutlined className="dropdown-icon" />
              </a>
            </div>
          </nav>
          <div className="header-right">
            {
              user ? (
                <>
                  <Dropdown
                    menu={{ items: userMenuItems, onClick: handleMenuClick }}
                    placement="bottomRight"
                    trigger={["click"]}
                  >
                    <div className="user-info" style={{ cursor: "pointer" }}>
                      <Avatar src={detailUser?.img_url || ""}
                        icon={<UserOutlined />}
                        fallback={<UserOutlined />}
                        className="user-avatar" />
                      <span className="user-name">
                        {user?.name || "Người dùng"}
                      </span>
                    </div>
                  </Dropdown>
                </>
              ) : (
                <div className="header-actions">
                  <Button type="link" className="logout-btn"  onClick={() => window.location.href = "/login"}>
                    Đăng nhập
                  </Button>
                </div>
              )
            }
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
