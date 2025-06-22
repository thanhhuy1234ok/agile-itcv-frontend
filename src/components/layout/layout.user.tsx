import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import type { FC } from 'react';

const UserLayout: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === '/login'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ 
        background: 'grey', 
        padding: '10px', 
        color: 'white', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' }}>
          <div style={{cursor: 'pointer'}} onClick={()=>navigate('/')}>
            <h1 style={{margin: 0}}>🌐 User Header</h1>
          </div>
          {!isLoginPage && (<Button type='primary' onClick={()=>navigate('/login')}>Login</Button>)}
          
      </header>

      <main style={{ flex: 1 }}>
        <Outlet /> 
      </main>

      <footer style={{ background: '#001529', padding: '10px', color: 'white', textAlign: 'center' }}>
        © 2025 My App - All rights reserved.
      </footer>
    </div>
  );
};

export default UserLayout;
