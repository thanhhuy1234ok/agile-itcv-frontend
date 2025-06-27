import { Outlet } from 'react-router-dom';
import type { FC } from 'react';
import Header from '@/components/layout/header/layout.header'; 
import Footer from './footer/layout.footer';

const UserLayout: FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header>
        <Header />
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer >
        <Footer/>
      </footer>
    </div>
  );
};

export default UserLayout;
