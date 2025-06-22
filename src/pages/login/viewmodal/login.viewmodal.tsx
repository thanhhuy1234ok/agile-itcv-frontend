import { message } from 'antd';
import { login } from '@/services/api';
import type { LoginValues } from '@/pages/login/dto/login.dto';

export const LoginModal = () => {
  const handleLogin = async (values: LoginValues) => {
    console.log("user", values.remember)
    try {
      const res = await login({
        email: values.username,
        password: values.password,
      });
      if (res.code === 1) {
        message.success(res.message);
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
