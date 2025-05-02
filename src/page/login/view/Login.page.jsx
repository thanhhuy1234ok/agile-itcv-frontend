import { Card, Typography, Input, Button, Alert } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import CustomForm from "@/components/foundation/CustomForm";
import { useLoginModal } from "@/page/login/viewmodal/LoginModal";
import "@/styles/AuthStyle.scss";

const { Title, Text } = Typography;

const LoginPage = () => {
  const { handleLogin, loading } = useLoginModal();

  const fields = [
    {
      name: "email",
      label: "Email",
      rules: [
        { required: true, message: "Vui lòng nhập email!" },
        { type: "email", message: "Email không hợp lệ!" },
      ],
      render: () => (
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Nhập email của bạn"
          size="large"
        />
      ),
    },
    {
      name: "password",
      label: "Mật khẩu",
      rules: [{ required: true, message: "Vui lòng nhập mật khẩu!" }],
      render: () => (
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Nhập mật khẩu của bạn"
          size="large"
        />
      ),
    },
  ];

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <Title level={3} className="auth-title">
          Đăng nhập
        </Title>

        <Alert
          message="Thông tin đăng nhập mẫu"
          description={
            <div>
              <p>
                <strong>Admin:</strong> admin@example.com / admin123
              </p>
              <p>
                <strong>Developer:</strong> dev@example.com / dev123
              </p>
              <p>
                <strong>User:</strong> user@example.com / user123
              </p>
            </div>
          }
          type="info"
          showIcon
          style={{ marginBottom: 24 }}
        />

        <div className="social-login">
          <Button className="social-button" icon={<GoogleOutlined />}>
            Google
          </Button>
          <Button className="social-button" icon={<FacebookOutlined />}>
            Facebook
          </Button>
        </div>

        <div className="auth-divider">
          <span className="divider-text">hoặc đăng nhập với email</span>
        </div>

        <CustomForm
          fields={fields}
          onFinish={handleLogin}
          buttonText="Đăng nhập"
          loading={loading}
        />

        <div className="login-footer">
          <a href="/forgot-password">Quên mật khẩu?</a>
          <a href="/register">Chưa có tài khoản? Đăng ký</a>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
