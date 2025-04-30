import { createBrowserRouter } from "react-router-dom";
import LayoutAdmin from "@/components/layout/layout.admin";
import LayoutUser from "@/components/layout/layout.user";
import HomePage from "@/page/home/Home.page";
import LoginPage from "@/page/login/view/Login.page";
import RegisterPage from "@/page/register/view/register.page";
import CloneSitePage from "@/page/clone-site/view/CloneSite.page";
import AdminPanelPage from "@/page/admin-panel/view/AdminPanel.page";
import { ProtectedRoute, DefaultRoute } from "./RouteComponents";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute requiredRole="dev">
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <LayoutAdmin />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DefaultRoute />,
      },
      {
        path: "home",
        element: (
          <ProtectedRoute requiredRole="admin">
            <AdminPanelPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/user",  // Route dành cho user
    element: (
      <ProtectedRoute requiredRole="user">
        <LayoutUser />  {/* Sử dụng LayoutUser cho các trang người dùng */}
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <CloneSitePage />,  // Trang chủ của người dùng là CloneSitePage
      },
      {
        path: "clone-site",
        element: <CloneSitePage />,  // Trang clone-site khác cho người dùng
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  // Default route - will redirect based on authentication status and role
  {
    path: "*",
    element: <DefaultRoute />,
  },
]);
