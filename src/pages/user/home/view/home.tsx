import React from "react";
import { Typography, Image } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import JobSearchBanner from "@/components/share/JobSearchBanner";
import TopEmployersSection from "@/components/share/TopEmployersSection";
import TopJobsSection from "@/components/share/topJobsSection";
import InfoSection from "@/components/share/infoSection";
import useHome from "@/pages/user/home/viewmodal/useHome";
import "@/styles/home.style.scss";

const { Paragraph } = Typography;

const HomePage: React.FC = () => {
  const { jobs, companies, loading } = useHome();

  return (
    <>
      <JobSearchBanner />

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
            <span style={{ color: "black", marginLeft: 5, cursor: "pointer" }}>
              Join us now! <ArrowRightOutlined style={{ color: "#ed1b2f" }} />
            </span>
          </span>
        </Paragraph>
      </div>
      <div className="wrapper">
        <div className="content">
          <InfoSection />
          <TopEmployersSection companies={companies} loading={loading} />
          <TopJobsSection jobs={jobs} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
