import React from "react";
import { Typography, Button, Image } from "antd";
import { SearchOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { DebounceSelect } from "@/components/share/debouce.select";
import { skillOptions } from "@/data/skillsData";

import TopEmployersSection from "@/components/share/TopEmployersSection";
import TopJobsSection from "@/components/share/topJobsSection";
import InfoSection from "@/components/share/infoSection";
import useHome from "@/pages/user/home/viewmodal/useHome";
import "@/styles/home.style.scss";

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const {
    jobs,
    companies,
    loading,
    selectedCity,
    keyword,
    fetchCitiesFromAPI,
    fetchSkills,
    setSelectedCity,
    setKeyword,
    handleSearch,
  } = useHome();

  return (
    <>
      <div
        style={{
          height: 300,
          background: "linear-gradient(to right, #000000, #a32020)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Title
            level={2}
            style={{ margin: 0, color: "white", textAlign: "left" }}
          >
            912 Việc làm IT cho Developer "Chất"
          </Title>

          <div style={{ display: "flex", gap: 10 }}>
            <DebounceSelect
              className="custom-search-select city-select"
              showSearch
              placeholder="Chọn thành phố"
              fetchOptions={fetchCitiesFromAPI}
              onChange={(newValue) => {
                if (!Array.isArray(newValue) && newValue?.value) {
                  setSelectedCity(String(newValue.value));
                }
              }}
              value={
                selectedCity
                  ? { label: selectedCity, value: selectedCity }
                  : null
              }
            />
            <DebounceSelect
              className="custom-search-select skill-select"
              showSearch
              placeholder="Nhập kỹ năng"
              fetchOptions={fetchSkills}
              onChange={(newValue) => {
                if (!Array.isArray(newValue) && newValue?.value) {
                  setKeyword(String(newValue.value));
                }
              }}
              value={
                keyword
                  ? {
                      label:
                        skillOptions.find((s) => s.value === keyword)?.label ||
                        keyword,
                      value: keyword,
                    }
                  : null
              }
            />

            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              style={{
                height: 55,
                fontSize: 20,
                width: 150,
                backgroundColor: "#ed1b2f",
                borderColor: "#ed1b2f",
              }}
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div
          style={{
            height: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f7f7f7",
          }}
        >
          <Paragraph
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              margin: 0,
            }}
          >
            <Image
              width={30}
              preview={false}
              src="https://itviec.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOE5GWUE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--dd2c47f31cc31fcdd3873b849fab1a0e2ab288de/survey-icon-campaign-highlight.png"
              alt="Survey Icon"
            />
            <span style={{ fontSize: 16 }}>
              <strong>IT Market Insight & AI Adoption Survey.</strong> Your
              answers help decode uncertainties.
              <span
                style={{ color: "black", marginLeft: 5, cursor: "pointer" }}
              >
                Join us now! <ArrowRightOutlined style={{ color: "#ed1b2f" }} />
              </span>
            </span>
          </Paragraph>
        </div>
        <InfoSection />
      </div>

      <TopEmployersSection companies={companies} loading={loading} />
      <TopJobsSection jobs={jobs} loading={loading} />
    </>
  );
};

export default HomePage;
