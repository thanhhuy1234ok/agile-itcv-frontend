import { Outlet } from 'react-router-dom';
import type { FC } from 'react';

const UserLayout: FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#1890ff', padding: '10px', color: 'white' }}>
        <h1>🌐 User Header</h1>
      </header>

      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet /> 
      </main>

      <footer style={{ background: '#001529', padding: '10px', color: 'white', textAlign: 'center' }}>
        © 2025 My App - All rights reserved.
      </footer>
    </div>
  );
};

export default UserLayout;
