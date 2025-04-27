"use client";

import { useState, useEffect } from "react";
import { Tag, Avatar, Pagination, Spin, Empty, Select, Button } from "antd";
import {
  EnvironmentOutlined,
  FireOutlined,
  ClockOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import "./JobList.style.scss";

// Mock data for demonstration
const mockJobs = [
  {
    id: "1",
    title: "Full Stack Developer / Java, ReactJS",
    company: {
      id: "c1",
      name: "AITS Solution LLC",
      logo: "/abstract-geometric-logo.png",
    },
    location: "Đường Láng, đi làm tại văn phòng, Đống Đa",
    salary: {
      display: "Tới 35tr (gross)",
      isNegotiable: false,
    },
    skills: [
      { id: "java", name: "Java" },
      { id: "spring-boot", name: "Spring Boot" },
      { id: "reactjs", name: "ReactJS" },
      { id: "javascript", name: "JavaScript" },
      { id: "docker", name: "Docker" },
    ],
    postedDate: "5 ngày trước",
    isHybrid: true,
    isRemote: false,
    isUrgent: false,
  },
  {
    id: "2",
    title: "Senior Frontend Engineer (ReactJS)",
    company: {
      id: "c2",
      name: "Jobhopin Vietnam",
      logo: "/abstract-geometric-logo.png",
    },
    location: "TP Hồ Chí Minh",
    salary: {
      display: "Lương thỏa thuận",
      isNegotiable: true,
    },
    skills: [
      { id: "reactjs", name: "ReactJS" },
      { id: "javascript", name: "JavaScript" },
      { id: "html-css", name: "HTML/CSS" },
      { id: "redux", name: "Redux" },
      { id: "typescript", name: "TypeScript" },
    ],
    postedDate: "3 ngày trước",
    isHybrid: false,
    isRemote: false,
    isUrgent: false,
  },
  {
    id: "3",
    title: "Front End Developer (JavaScript, ReactJS, VueJS)",
    company: {
      id: "c3",
      name: "LOI OVN Tech Team",
      logo: "/abstract-geometric-logo.png",
    },
    location: "Hà Nội",
    salary: {
      display: "Tới 30tr (gross)",
      isNegotiable: false,
    },
    skills: [
      { id: "javascript", name: "JavaScript" },
      { id: "reactjs", name: "ReactJS" },
      { id: "vuejs", name: "VueJS" },
      { id: "html-css", name: "HTML/CSS" },
      { id: "rest-api", name: "REST API" },
    ],
    postedDate: "Hôm nay",
    isHybrid: false,
    isRemote: false,
    isUrgent: true,
  },
  {
    id: "4",
    title: "Sr Front-end Engineer (ReactJS, JavaScript)",
    company: {
      id: "c4",
      name: "Westlake",
      logo: "/abstract-geometric-logo.png",
    },
    location: "TP Hồ Chí Minh",
    salary: {
      display: "Lương thỏa thuận",
      isNegotiable: true,
    },
    skills: [
      { id: "reactjs", name: "ReactJS" },
      { id: "javascript", name: "JavaScript" },
      { id: "typescript", name: "TypeScript" },
      { id: "nextjs", name: "NextJS" },
      { id: "redux", name: "Redux" },
    ],
    postedDate: "Hôm nay",
    isHybrid: false,
    isRemote: true,
    isUrgent: true,
  },
];

const JobList = ({ title, showFilters = true }) => {
  const [loading, setLoading] = useState(false);
  const [_jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs] = useState(105);
  const [sortBy, setSortBy] = useState("newest");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    skills: [],
    levels: [],
    locations: [],
  });

  // Simulate loading jobs
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 800);
  }, [currentPage, sortBy]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const toggleFilter = (type, value) => {
    setSelectedFilters((prev) => {
      const current = [...prev[type]];
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter((item) => item !== value) };
      } else {
        return { ...prev, [type]: [...current, value] };
      }
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      skills: [],
      levels: [],
      locations: [],
    });
  };

  return (
    <div className="job-list-container">
      {title && <h2 className="section-title">{title}</h2>}

      {showFilters && (
        <div className="job-list-header">
          <div className="job-count">
            Hiển thị <span className="highlight">{_jobs.length}</span> trong số{" "}
            <span className="highlight">{totalJobs}</span> việc làm
          </div>

          <div className="job-filters">
            <Button
              icon={<FilterOutlined />}
              onClick={toggleFilters}
              className={`filter-toggle-btn ${filtersVisible ? "active" : ""}`}>
              Bộ lọc
            </Button>

            <div className="sort-container">
              <span className="sort-label">Sắp xếp theo:</span>
              <Select
                defaultValue="newest"
                onChange={handleSortChange}
                options={[
                  { value: "newest", label: "Mới nhất" },
                  { value: "salary", label: "Lương cao nhất" },
                  { value: "relevance", label: "Phù hợp nhất" },
                ]}
                className="sort-select"
              />
            </div>
          </div>
        </div>
      )}

      {filtersVisible && showFilters && (
        <div className="filter-panel">
          <div className="filter-section">
            <h3 className="filter-title">Kỹ năng</h3>
            <div className="filter-tags">
              <Tag
                className={`filter-tag ${
                  selectedFilters.skills.includes("ReactJS") ? "selected" : ""
                }`}
                onClick={() => toggleFilter("skills", "ReactJS")}>
                ReactJS
              </Tag>
              <Tag
                className={`filter-tag ${
                  selectedFilters.skills.includes("JavaScript")
                    ? "selected"
                    : ""
                }`}
                onClick={() => toggleFilter("skills", "JavaScript")}>
                JavaScript
              </Tag>
              <Tag
                className={`filter-tag ${
                  selectedFilters.skills.includes("Java") ? "selected" : ""
                }`}
                onClick={() => toggleFilter("skills", "Java")}>
                Java
              </Tag>
              <Tag
                className={`filter-tag ${
                  selectedFilters.skills.includes("Python") ? "selected" : ""
                }`}
                onClick={() => toggleFilter("skills", "Python")}>
                Python
              </Tag>
              <Tag
                className={`filter-tag ${
                  selectedFilters.skills.includes("NodeJS") ? "selected" : ""
                }`}
                onClick={() => toggleFilter("skills", "NodeJS")}>
                NodeJS
              </Tag>
              <Tag className="filter-tag">+ Thêm</Tag>
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Cấp bậc</h3>
            <div className="filter-tags">
              <Tag
                className={`filter-tag ${
                  selectedFilters.levels.includes("Fresher") ? "selected" : ""
                }`}
                onClick={() => toggleFilter("levels", "Fresher")}>
                Fresher
              </Tag>
              <Tag
                className={`filter-tag ${
                  selectedFilters.levels.includes("Junior") ? "selected" : ""
                }`}
                onClick={() => toggleFilter("levels", "Junior")}>
                Junior
              </Tag>
              <Tag
                className={`filter-tag ${
                  selectedFilters.levels.includes("Middle") ? "selected" : ""
                }`}
                onClick={() => toggleFilter("levels", "Middle")}>
                Middle
              </Tag>
              <Tag
                className={`filter-tag ${
                  selectedFilters.levels.includes("Senior") ? "selected" : ""
                }`}
                onClick={() => toggleFilter("levels", "Senior")}>
                Senior
              </Tag>
              <Tag
                className={`filter-tag ${
                  selectedFilters.levels.includes("Leader") ? "selected" : ""
                }`}
                onClick={() => toggleFilter("levels", "Leader")}>
                Leader
              </Tag>
              <Tag className="filter-tag">+ Thêm</Tag>
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Địa điểm</h3>
            <div className="filter-tags">
              <Tag
                className={`filter-tag ${
                  selectedFilters.locations.includes("Hà Nội") ? "selected" : ""
                }`}
                onClick={() => toggleFilter("locations", "Hà Nội")}>
                Hà Nội
              </Tag>
              <Tag
                className={`filter-tag ${
                  selectedFilters.locations.includes("TP Hồ Chí Minh")
                    ? "selected"
                    : ""
                }`}
                onClick={() => toggleFilter("locations", "TP Hồ Chí Minh")}>
                TP Hồ Chí Minh
              </Tag>
              <Tag
                className={`filter-tag ${
                  selectedFilters.locations.includes("Đà Nẵng")
                    ? "selected"
                    : ""
                }`}
                onClick={() => toggleFilter("locations", "Đà Nẵng")}>
                Đà Nẵng
              </Tag>
              <Tag className="filter-tag">+ Thêm</Tag>
            </div>
          </div>

          <div className="filter-actions">
            <Button type="primary">Áp dụng</Button>
            <Button onClick={clearFilters}>Xóa bộ lọc</Button>
          </div>
        </div>
      )}

      <div className="job-list">
        {loading ? (
          <div className="loading-container">
            <Spin size="large" />
          </div>
        ) : _jobs.length > 0 ? (
          _jobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <div className="job-title-container">
                  <h3 className="job-title">
                    <a href={`/jobs/${job.id}`}>{job.title}</a>
                  </h3>
                  {job.isUrgent && <Tag color="red">Đăng {job.postedDate}</Tag>}
                  {!job.isUrgent && (
                    <Tag color="orange">Đăng {job.postedDate}</Tag>
                  )}
                </div>
                <div className="company-logo">
                  <Avatar src={job.company.logo} />
                </div>
              </div>

              <div className="company-name">
                <a href={`/companies/${job.company.id}`}>{job.company.name}</a>
              </div>

              <div className="job-location">
                <EnvironmentOutlined /> {job.location}
              </div>

              <div className="job-salary">
                <FireOutlined className="salary-icon" />
                <span>{job.salary.display}</span>
              </div>

              {job.isHybrid && (
                <div className="job-location">
                  <ClockOutlined /> Làm hybrid
                </div>
              )}

              {job.isRemote && (
                <div className="job-location">
                  <ClockOutlined /> Làm remote
                </div>
              )}

              <div className="job-skills">
                {job.skills.map((skill) => (
                  <Tag key={skill.id}>{skill.name}</Tag>
                ))}
              </div>
            </div>
          ))
        ) : (
          <Empty description="Không tìm thấy việc làm phù hợp" />
        )}
      </div>

      {totalJobs > 0 && (
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            total={totalJobs}
            pageSize={10}
            onChange={handlePageChange}
            showSizeChanger={false}
            showTotal={(total) => `Tổng ${total} việc làm`}
          />
        </div>
      )}
    </div>
  );
};

export default JobList;
