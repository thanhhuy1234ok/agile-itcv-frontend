import React, { useState } from "react";
import { Typography, Input, Button, Image, Row, Col } from "antd";
import { SearchOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { DebounceSelect } from "@/components/share/debouce.select"; 
import InfoCard from "@/components/share/surveyCard";
import TopEmployerCard from "@/components/share/topEmployerCard";
import "@/styles/home.style.scss";

const { Title, Paragraph } = Typography;

const fetchCitiesFromAPI = async (
  search: string
): Promise<{ label: string; value: string }[]> => {
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

const HomePage: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const handleSearch = (): void => {
    console.log("🔍 Tìm kiếm:");
    console.log("Thành phố:", selectedCity || "(chưa chọn)");
    console.log("Từ khóa:", keyword || "(chưa nhập)");
  };

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
          <Title level={2} style={{ margin: 0, color: "white", textAlign: "left" }}>
            912 Việc làm IT cho Developer "Chất"
          </Title>

          <div style={{ display: "flex", gap: 10 }}>
            <DebounceSelect
              className="custom-search-select"
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
            <Input
              style={{ height: 55, fontSize: 20, width: 500 }}
              placeholder="Nhập từ khóa theo kỹ năng"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              style={{ height: 55, fontSize: 20, width: 150, backgroundColor: "#ed1b2f", borderColor: "#ed1b2f" }}
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
            background: "#f7f7f7" 
          }}
        >
          <Paragraph style={{ display: "flex", alignItems: "center", gap: 12, margin: 0 }}>
            <Image
              width={30}
              preview={false}
              src="https://itviec.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOE5GWUE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--dd2c47f31cc31fcdd3873b849fab1a0e2ab288de/survey-icon-campaign-highlight.png"
              alt="Survey Icon"
            />
            <span style={{ fontSize: 16 }}>
              <strong>IT Market Insight & AI Adoption Survey.</strong> Your answers help decode uncertainties.
              <span style={{ color: "black", marginLeft: 5, cursor: "pointer" }}>
                Join us now! <ArrowRightOutlined style={{ color: "#ed1b2f" }} />
              </span>
            </span>
          </Paragraph>
        </div>

        
        <div style={{ paddingTop: 30 }}>
          <Row gutter={32} justify="center">
            <Col xs={24} sm={8}>
              <InfoCard
                image="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
                title="Passive Job Search"
                description="Khám phá xu hướng công nghệ và thị trường việc làm."
                label="HOT"
                labelStyle={{ backgroundColor: "#ff4d4f", color: "white" }}
                buttonText="Xem thêm"
                onButtonClick={() => console.log("Click: Xem thêm xu hướng")}
              />
            </Col>
            <Col xs={24} sm={8}>
              <InfoCard
                image="https://cdn-icons-png.flaticon.com/512/1098/1098925.png"
                title="CV Template"
                description="Những thay đổi mà AI mang lại cho lập trình viên."
                label="NEW"
                labelStyle={{ backgroundColor: "#52c41a", color: "white" }}
                buttonText="Xem mẫu"
                onButtonClick={() => console.log("Click: Xem mẫu")}
              />
            </Col>
            <Col xs={24} sm={8}>
              <InfoCard
                image="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                title="Blog"
                description="Số liệu được tổng hợp từ cộng đồng IT tại Việt Nam."
                buttonText="Khám phá"
                onButtonClick={() => console.log("Click: khám phá")}
              />
            </Col>
          </Row>
        </div>
      </div>

      <div style={{ paddingTop: 30 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Title level={2}>Nhà tuyển dụng hàng đầu</Title>
          <Paragraph style={{ fontSize: 16 }}>
            Khám phá những công ty công nghệ hàng đầu đang tuyển dụng tại Việt Nam
          </Paragraph>
        </div>

        <Row gutter={[24, 24]} justify="center">
          {[
            {
              name: "VNG Corporation",
              logo: "https://upload.wikimedia.org/wikipedia/vi/thumb/3/34/VNG_logo.svg/1200px-VNG_logo.svg.png",
              skills: ["React", "Node.js", "Kubernetes"],
              location: ["Hồ Chí Minh"],
              jobCount: 12,
            },
            {
              name: "FPT Software",
              logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/FPT_Software_Logo.svg",
              skills: ["Java", "Spring Boot", "AWS"],
              location: ["Hà Nội", "Đà Nẵng"],
              jobCount: 25,
            },
            {
              name: "Vingroup",
              logo: "https://upload.wikimedia.org/wikipedia/vi/thumb/6/62/Vingroup_logo.svg/1200px-Vingroup_logo.svg.png",
              skills: ["React", "Python", "AI/ML", "Kubernetes"],
              location: ["Hà Nội", "Hồ Chí Minh"],
              jobCount: 18,
            },
            {
              name: "Tiktok Vietnam",
              logo: "https://upload.wikimedia.org/wikipedia/en/6/69/TikTok_logo.svg",
              skills: ["Go", "Node.js", "Microservices", "Kafka"],
              location: ["Hồ Chí Minh"],
              jobCount: 9,
            },
          ].map((company, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <TopEmployerCard
                logo={company.logo}
                name={company.name}
                skills={company.skills}
                location={company.location}
                jobCount={company.jobCount}
                onView={() => console.log("Xem chi tiết:", company.name)}
              />
            </Col>
          ))}
        </Row>
      </div>

    </>
    
  );
};

export default HomePage;
