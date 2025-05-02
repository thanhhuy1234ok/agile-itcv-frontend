import { Card, Typography, Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  GoogleOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import CustomForm from "@/components/foundation/CustomForm";
import useRegisterModal from "../viewmodal/RegisterModal";
import "@/styles/AuthStyle.scss";

const { Title, Text } = Typography;

const RegisterPage = () => {
  const { handleRegister, loading } = useRegisterModal();

  const fields = [
    {
      name: "name",
      label: "Họ tên",
      rules: [{ required: true, message: "Vui lòng nhập họ tên!" }],
      render: () => (
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Nhập họ tên của bạn"
          size="large"
        />
      ),
    },
    {
      name: "email",
      label: "Email",
      rules: [
        { required: true, message: "Vui lòng nhập email!" },
        { type: "email", message: "Email không hợp lệ!" },
      ],
      render: () => (
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Nhập email của bạn"
          size="large"
        />
      ),
    },
    {
      name: "password",
      label: "Mật khẩu",
      rules: [
        { required: true, message: "Vui lòng nhập mật khẩu!" },
        { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
      ],
      render: () => (
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Tạo mật khẩu"
          size="large"
        />
      ),
    },
    {
      name: "repassword",
      label: "Nhập lại mật khẩu",
      dependencies: ["password"],
      rules: [
        { required: true, message: "Vui lòng nhập lại mật khẩu!" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Mật khẩu không khớp!"));
          },
        }),
      ],
      render: () => (
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Nhập lại mật khẩu"
          size="large"
        />
      ),
    },
    {
      name: "phone",
      label: "Số điện thoại",
      rules: [{ required: true, message: "Vui lòng nhập số điện thoại!" }],
      render: () => (
        <Input
          prefix={<PhoneOutlined className="site-form-item-icon" />}
          placeholder="Nhập số điện thoại của bạn"
          size="large"
        />
      ),
    },
  ];

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <Title level={3} className="auth-title">
          Đăng ký tài khoản
        </Title>

        <div className="social-login">
          <Button className="social-button" icon={<GoogleOutlined />}>
            Google
          </Button>
          <Button className="social-button" icon={<FacebookOutlined />}>
            Facebook
          </Button>
        </div>

        <div className="auth-divider">
          <span className="divider-text">hoặc đăng ký với email</span>
        </div>

        <CustomForm
          fields={fields}
          onFinish={handleRegister}
          buttonText="Đăng ký"
          loading={loading}
        />

        <div className="register-footer">
          <a href="/login">Đã có tài khoản? Đăng nhập</a>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
