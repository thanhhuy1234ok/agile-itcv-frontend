import { createBrowserRouter } from "react-router-dom";
import UserLayout from "@/components/layout/layout.user";
import AdminLayout from "@/components/layout/layout.admin";
import HomePage from "@/pages/user/home/view/home";
import LoginPage from "@/pages/login/view/login";
import RegisterPage from "@/pages/register/view/register";
import FindPage from "@/pages/user/find/view/find";
import JobDetailPage from "@/pages/user/detail/view/detail";
import Dashboard from "@/pages/admin/dashboard/view/Dashboard";
import { ProtectedAdminRoute } from "@/routers/protectedAdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "find", element: <FindPage /> },
      { path: "jobdetail", element: <JobDetailPage /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdminRoute>
        <AdminLayout />
      </ProtectedAdminRoute>
    ),
    children: [{ index: true, element: <Dashboard /> }],
  },
]);

export default router;
