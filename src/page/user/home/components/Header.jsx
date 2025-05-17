"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  CaretDownOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/global/AuthenticationContext";
import { jobNavigationMenu } from "@/data/job-categories";
import "./Style.Header.scss";

const Header = () => {
const {onLogout} = useAuth()
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const submenuRef = useRef(null);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
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

  const handleLogout = () => {
    // localStorage.removeItem("access_token"); 
    // localStorage.removeItem("user");
    onLogout()
  };

  const handleSearch = () => {
    // Implement search functionality
    console.log("Searching for:", { searchKeyword, searchLocation });
  };

  const renderSubmenu = (submenu) => {
    if (!submenu) return null;

    return (
      <div
        className={`submenu-panel ${
          activeSubmenu === submenu.id ? "active" : ""
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
      <header className={`itviec-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          <div className="logo">
            <span className="logo-text">
              IT<span className="logo-highlight">Viec</span>
            </span>
          </div>
          <nav className="main-nav">
            <div className="nav-item-wrapper" ref={dropdownRef}>
              <a
                href="#"
                className={`nav-item ${
                  activeDropdown === "jobs" ? "active" : ""
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
                      className={`dropdown-item ${
                        activeSubmenu === menu.id ? "active" : ""
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
                className={`nav-item ${
                  activeDropdown === "companies" ? "active" : ""
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
                className={`nav-item ${
                  activeDropdown === "blog" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdownToggle("blog");
                }}>
                Blog <CaretDownOutlined className="dropdown-icon" />
              </a>
            </div>
          </nav>
          <div className="header-actions">
            <a href="#" className="login-link">
              Nhà Tuyển Dụng
            </a>
            <div className="divider"></div>
            <div className="language-selector">
              <span className="active-lang">VI</span>
              <span className="language-divider">|</span>
              <span>EN</span>
            </div>
            <Button type="link" className="logout-btn" onClick={handleLogout}>
              Đăng Xuất
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">977 Việc làm IT cho Developer "Chất"</h1>
          <div className="search-container">
            <div className="search-input-group">
              <div className="search-input keyword">
                <SearchOutlined className="search-icon" />
                <input
                  type="text"
                  placeholder="VP kỹ sư, React..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
              <div className="search-input location">
                <EnvironmentOutlined className="search-icon" />
                <input
                  type="text"
                  placeholder="Thành phố hoặc địa điểm, VD: Hà Nội, quận 2..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
            </div>
            <Button
              type="primary"
              className="search-button"
              onClick={handleSearch}>
              Tìm kiếm
            </Button>
          </div>
          <div className="search-tags">
            <span className="tag-label">Gợi ý cho bạn:</span>
            <a href="#" className="search-tag">
              React/JS
            </a>
            <a href="#" className="search-tag">
              Java
            </a>
            <a href="#" className="search-tag">
              Python
            </a>
            <a href="#" className="search-tag">
              .NET
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
