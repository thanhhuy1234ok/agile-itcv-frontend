import { createBrowserRouter } from "react-router-dom";
import HomePage from '@/pages/home';
import UserLayout from '@/components/layout/layout.user'
import LoginPage from "@/pages/login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />, 
    children:
    [
      {
        index: true,
        element: <HomePage />
      }
    ]
  },
  
  {
    path: "/login",
    element: <LoginPage />
  }
]);

export default router;