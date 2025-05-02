import { createBrowserRouter } from 'react-router-dom';
import LayoutSelector from '@/components/layout/LayoutSelector';
import LoginPage from '@/page/login/view/Login.page';
import RegisterPage from '@/page/register/view/register.page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutSelector />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  }
]);
