import Header from "../components/Header";
import Notification from "../components/Notification";
import ToolsSection from "../components/ToolsSection";
import CompaniesSection from "../components/CompaniesSection";
import JobsSection from "../components/JobsSection";
import BlogSection from "../components/BlogSection";
import Footer from "../components/Footer";
import "./Style.User.HomePage.scss";

const UserHomepage = () => {
  return (
    <div className="itviec-clone">
      <Header />
      <Notification />
      <ToolsSection />
      <CompaniesSection />
      <JobsSection />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default UserHomepage;
