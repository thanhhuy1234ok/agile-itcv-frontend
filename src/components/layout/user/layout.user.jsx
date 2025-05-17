import { Layout, Menu, Button, Dropdown, Avatar, Breadcrumb, Badge } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/global/AuthenticationContext";
import { Outlet } from "react-router-dom";  // Import Outlet
import "./layout.admin.style.scss";

const LayoutUser = () =>{
    return (
        <>
            <Outlet/>
        </>
    )
}

export default LayoutUser;
