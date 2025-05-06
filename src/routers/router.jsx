import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '@/page/login/view/Login.page';
import RegisterPage from '@/page/register/view/register.page';

import LayoutAdmin from '@/components/layout/admin/layout.admin';
import AdminHomepage from '@/page/admin/home/view/Admin.HomePage';
import ManageUser from '@/page/admin/manageuser/view/Admin.ManageUser';

import LayoutUser from '@/components/layout/user/layout.user';
import UserHomepage from '@/page/user/home/view/User.HomePage';

import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute role="Admin">
        <LayoutAdmin />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminHomepage /> },
      { path: 'manage-user', element: <ManageUser /> },
    ],
  },
  {
    path: '/',  
    element: (
      <ProtectedRoute role="User">
        <LayoutUser />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <UserHomepage /> },
    ],
  },
]);
