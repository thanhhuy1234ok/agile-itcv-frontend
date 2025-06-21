import React from 'react';
import { Card, message } from 'antd';
import CustomForm from '@/components/share/customForm';
import type { FieldConfig } from '@/components/share/customForm'
import { login } from '@/services/api';

interface LoginValues {
  username: string;
  password: string;
  remember: boolean;
}

const LoginPage: React.FC = () => {
  const fields: FieldConfig[] = [
    { name: 'username', label: 'Tên đăng nhập', type: 'text' },
    { name: 'password', label: 'Mật khẩu', type: 'password' },
    { name: 'remember', label: 'Ghi nhớ đăng nhập', type: 'checkbox' }
  ];

  const handleLogin = async (values: LoginValues) => {
    try {
      const res = await login({
        email: values.username,
        password: values.password,
      });
      if(res.code === 1){
        message.success(res.message);
      }else{
        message.error(res.message)
      }
      
    } catch (err: any) {
      console.error('Login failed:', err.response?.data?.message);
      message.error(err.response?.data?.message || 'Đăng nhập thất bại');
    }
  };


  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ width: 400 }}>
        <CustomForm<LoginValues>
          title="Đăng nhập"
          submitText="Đăng nhập"
          fields={fields}
          onFinish={handleLogin}
        />
      </Card>
    </div>
  );
};

export default LoginPage;
