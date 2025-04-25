import LayoutAdmin from '@/components/layout/layout.admin';
import HomePage from '@/page/home/Home.page';
import LoginPage from '@/page/login/view/Login.page';
import RegisterPage from '@/page/register/view/register.page';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
]);
