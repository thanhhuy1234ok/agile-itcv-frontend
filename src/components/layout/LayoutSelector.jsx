import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { useAuth } from '@/global/AuthenticationContext';

import LayoutAdmin from '@/components/layout/admin/layout.admin';
import AdminHomepage from '@/page/admin/home/view/Admin.HomePage';

import LayoutUser from '@/components/layout/user/layout.user';
import UserHomepage from '@/page/user/home/view/User.HomePage';


const LayoutSelector = () => {
    const { user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) return <div>Loading...</div>; 

  if (!isAuthenticated) return <Navigate to="/login" />;

  const adminRoutes = {
    element: <LayoutAdmin />,
    children: [
      { path: '/', element: <AdminHomepage /> },
    ],
  };

  const userRoutes = {
    element: <LayoutUser />,
    children: [
      { path: '/', element: <UserHomepage /> },
    ],
  };

  const roleBasedRoutes = user.role.name === 'ADMIN' ? adminRoutes : userRoutes;

  const element = useRoutes([roleBasedRoutes]);
  return element;
};

export default LayoutSelector;
