import React, { useState } from "react";
import { DebounceSelect } from "@/components/share/debouce.select"; 
import { Typography } from "antd";
import "@/styles/home.style.scss"

const fetchJobs = async (search: string): Promise<{ label: string; value: string }[]> => {
  const allJobs = [
    { label: "Lập trình viên React", value: "react" },
    { label: "Backend với NodeJS", value: "nodejs" },
    { label: "Tester phần mềm", value: "tester" },
    { label: "Thiết kế UI/UX", value: "uiux" },
  ];

  return allJobs.filter((job) =>
    job.label.toLowerCase().includes(search.toLowerCase())
  );
};

const HomePage = () => {
  const { Title } = Typography;
  const [value, setValue] = useState<any>(null);

  const handleChange = (newValue: any) => {
    setValue(newValue);
    if (newValue) {
      console.log(newValue)
    }
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <Title
          level={2}
          style={{
            padding: 0,
            margin: 0,
            color: "white",
            textAlign: "left",
          }}
        >
          912 Việc làm IT cho Developer "Chất"
        </Title>

        <DebounceSelect
          className="custom-search-select"
          showSearch
          placeholder="Nhập từ khóa theo kỹ năng"
          fetchOptions={fetchJobs}
          onChange={handleChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default HomePage;
