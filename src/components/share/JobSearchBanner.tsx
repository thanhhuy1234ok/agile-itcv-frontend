import React, { useState } from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { skillOptions } from "@/data/skillsData";
import { DebounceSelect } from "./debouce.select";

const { Title } = Typography;

interface SelectOption {
  label: string;
  value: string;
}

const JobSearchBanner: React.FC = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const fetchCitiesFromAPI = async (
    search: string
  ): Promise<SelectOption[]> => {
    const response = await fetch("https://provinces.open-api.vn/api/?depth=1");
    const data = await response.json();

    return data
      .filter((city: any) =>
        city.name.toLowerCase().includes(search.toLowerCase())
      )
      .map((city: any) => ({
        label: city.name,
        value: city.name,
      }));
  };

  const fetchSkills = async (search: string): Promise<SelectOption[]> => {
    const filtered = skillOptions.filter((skill) =>
      skill.label.toLowerCase().includes(search.toLowerCase())
    );
    return filtered;
  };

  const handleSearch = (): void => {
    const params: Record<string, string> = {};
    if (selectedCity) params.location = selectedCity;
    if (keyword) params.skill = keyword;

    const queryString = new URLSearchParams(params).toString();
    navigate(`/find?${queryString}`);
  };

  return (
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
              selectedCity ? { label: selectedCity, value: selectedCity } : null
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
  );
};

export default JobSearchBanner;
