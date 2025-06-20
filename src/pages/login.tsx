import React from 'react';
import { Card, message } from 'antd';
import CustomForm from '@/components/share/customForm';
import type { FieldConfig } from '@/components/share/customForm'

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

  const handleLogin = (values: LoginValues) => {
    console.log('Đăng nhập:', values);
    message.success('Đăng nhập thành công');
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
