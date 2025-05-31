import { HomeOutlined, TeamOutlined, BankOutlined, IdcardOutlined, SolutionOutlined } from "@ant-design/icons";

export const adminMenuItems = [
  { key: "/admin", icon: <HomeOutlined />, label: "Trang chủ", breadcrumb: "Trang chủ" },
  { key: "/admin/manage-user", icon: <TeamOutlined />, label: "Quản lý người dùng", breadcrumb: "Quản lý người dùng" },
  { key: "/admin/manage-company", icon: <BankOutlined />, label: "Quản lý công ty", breadcrumb: "Quản lý công ty" },
  { key: "/admin/manage-resume", icon: <IdcardOutlined  />, label: "Quản lý hồ sơ", breadcrumb: "Quản lý hồ sơ" },
  { key: "/admin/manage-job", icon: <SolutionOutlined  />, label: "Quản lý công việc", breadcrumb: "Quản lý công việc" },
];
