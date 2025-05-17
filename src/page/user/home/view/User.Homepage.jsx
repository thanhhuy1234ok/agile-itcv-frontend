import Header from "../components/Header";
import Notification from "../components/Notification";
import ToolsSection from "../components/ToolsSection";
import CompaniesSection from "../components/CompaniesSection";
import JobsSection from "../components/JobsSection";
// import BlogSection from "../components/BlogSection";
import Footer from "../components/Footer";
import useHomepage from "../viewmodal/UserHomepageModal";
import "./Style.User.HomePage.scss";

const UserHomepage = () => {
  const{companies, loading, jobs} = useHomepage()
  return (
    <div className="itviec-clone">
      <Header />
      <Notification />
      <ToolsSection />
      <CompaniesSection companies={companies} loading={loading} />
      <JobsSection jobs={jobs} loading={loading} />
      {/* <BlogSection /> */}
      <Footer />
    </div>
  );
};

export default UserHomepage;
