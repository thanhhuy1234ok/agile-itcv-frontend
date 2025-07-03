// src/router/protectedAdminRoute.tsx
import { useCurrentApp } from '@/context/app.context';
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

export const ProtectedAdminRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useCurrentApp();

  if (!user || user.role.name !== 'Admin') {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
