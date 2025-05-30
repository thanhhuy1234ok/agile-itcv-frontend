import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '@/page/login/view/Login.page';
import RegisterPage from '@/page/register/view/register.page';

import LayoutAdmin from '@/components/layout/admin/layout.admin';
import AdminHomepage from '@/page/admin/home/view/Admin.HomePage';
import ManageUser from '@/page/admin/manageuser/view/Admin.ManageUser';
import ManageCompany from '@/page/admin/managecompany/view/Admin.ManageCompany';
import ManageResume from '@/page/admin/manageresume/view/Admin.ManageResume';

import LayoutUser from '@/components/layout/user/layout.user';
import UserHomepage from '@/page/user/home/view/User.HomePage';

import ProtectedRoute from './ProtectedRoute';
import ManageJobPage from '@/page/admin/managerjob/view/Admin.ManageJob';
import JobsDetail from '@/page/user/home/components/JobsDetail';
import JobList from '@/page/user/home/components/JobsList';
import Profile from '@/page/user/home/components/Profile';

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
      {path:'manage-job', element: <ManageJobPage />},
      { path: 'manage-company', element: <ManageCompany /> },
      { path: 'manage-resume', element: <ManageResume /> },
    ],
  },
  {
    path: '/',  
    element: (
      <LayoutUser />
    ),
    children: [
      { index: true, element: <UserHomepage /> },
      { path: 'it-jobs', element: <JobList />},
      { path: 'it-jobs/:id', element: <JobsDetail />},
      { path: 'profile', element: <Profile/> },
    ],
  },
]);
