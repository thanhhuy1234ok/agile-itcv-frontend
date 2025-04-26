import React from 'react';
import { Card, Typography, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import CustomForm from '@/components/foundation/CustomForm';
import { useLoginModal } from '@/page/login/viewmodal/LoginModal';
import '@/styles/AuthStyle.scss';

const { Title } = Typography;

const LoginPage = () => {
  const { handleLogin } = useLoginModal();

  const fields = [
    {
      name: 'email',
      label: 'Email',
      rules: [
        { required: true, message: 'Vui lòng nhập email!' },
        { type: 'email', message: 'Email không hợp lệ!' }
      ],
      render: () => (
        <Input
          prefix={<UserOutlined />}
          placeholder="Nhập email"
        />
      )
    },
    {
      name: 'password',
      label: 'Mật khẩu',
      rules: [{ required: true, message: 'Vui lòng nhập mật khẩu!' }],
      render: () => (
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Nhập mật khẩu"
        />
      )
    }
  ];

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <Title level={3} className="auth-title">
          Đăng nhập
        </Title>
        <CustomForm fields={fields} onFinish={handleLogin} buttonText="Đăng nhập" />
        <div className="login-footer">
          <a href="/register">Đăng ký ngay</a>
          <a href="/forgot-password">Quên mật khẩu?</a>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
