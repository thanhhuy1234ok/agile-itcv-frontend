import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import viVN from 'antd/locale/vi_VN';
import { router } from '@/routers/router.jsx'; 
import { ConfigProvider } from 'antd';
import { AuthProvider } from './global/AuthenticationContext';
import '@/styles/style.scss'; 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ConfigProvider locale={viVN}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </AuthProvider>
  </StrictMode>
);
