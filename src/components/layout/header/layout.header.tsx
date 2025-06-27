import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { useCurrentApp } from '@/context/app.context';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, onLogout } = useCurrentApp();

  const isLoginPage = location.pathname === '/login';

  return (
    <div style={{
      background: 'grey',
      padding: '10px',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <h1 style={{ margin: 0 }}>🌐 User Header</h1>
      </div>
      {!isLoginPage && (
        isAuthenticated && user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            👤 {user.name}
            <Button danger onClick={onLogout}>Logout</Button>
          </div>
        ) : (
          <Button type="primary" onClick={() => navigate('/login')}>Login</Button>
        )
      )}
    </div>
  );
};

export default Header;
