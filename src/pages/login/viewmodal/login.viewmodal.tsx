import { message } from 'antd';
import { useCurrentApp } from '@/context/app.context'
import { useNavigate } from 'react-router-dom';
import { login } from '@/services/api';
import type { LoginValues } from '@/pages/login/dto/login.dto';

export const LoginModal = () => {
  const navigate = useNavigate();
  const { onLogin } = useCurrentApp()
  const handleLogin = async (values: LoginValues) => {
    try {
      const res = await login({
        email: values.username,
        password: values.password,
      });
      if (res.code === 1) {
        message.success(res.message);
        onLogin(res.data.user)
        navigate('/')
      } else {
        message.error(res.message);
      }
    } catch (err: any) {
      console.error('Login failed:', err.response?.data?.message);
      message.error(err.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  return { handleLogin };
};
