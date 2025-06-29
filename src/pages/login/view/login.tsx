import React from 'react';
import { Card, Typography } from 'antd';
import CustomForm from '@/components/share/customForm';
import { fields } from '@/pages/login/data/login.data';
import type { LoginValues } from '@/pages/login/dto/login.dto';
import { LoginModal } from '@/pages/login/viewmodal/login.viewmodal';
import '@/pages/login/style/login.style.scss';

const LoginPage: React.FC = () => {
  const { Title, Text, Link } = Typography;
  const { handleLogin } = LoginModal();

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-left-inner">
          <Title className="login-title">Welcome to ITCV</Title>
          <Text className="login-description">
            By signing in, you agree to ITviec’s Terms & Conditions and Privacy Policy in relation to your privacy information.
          </Text>
          <Card className="login-card">
            <CustomForm<LoginValues>
              title=""
              submitText="Đăng nhập"
              fields={fields}
              onFinish={handleLogin}
              initialValues={{ remember: false } as LoginValues}
            />
            <div className="login-register-link">
              Do not have an account? <Link href="/register">Sign up now!</Link>
            </div>
          </Card>
        </div>
      </div>
      <div className="login-right">
        <div className="login-right-inner">
          <Title level={2}>Sign in to get instant access to thousands of reviews and salary information</Title>
          <ul className="custom-list">
            <li><Text>View salary to help you negotiate your offer or pay rise</Text></li>
            <li><Text>Find out about benefits, interview, company culture via reviews</Text></li>
            <li><Text>Easy apply with only 1 click</Text></li>
            <li><Text>Manage your own profile & privacy</Text></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
