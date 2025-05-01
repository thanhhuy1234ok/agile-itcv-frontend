import React from 'react';
import { Card, Typography, Input } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import CustomForm from '../../../components/foundation/CustomForm';
import useRegisterModal from '../viewmodal/RegisterModal';
import '../../../styles/AuthStyle.scss';

const { Title } = Typography;

const RegisterPage = () => {
  const {handleRegister} = useRegisterModal()

  const fields = [
    {
      name: 'name',
      label: 'Họ tên',
      rules: [{ required: true, message: 'Vui lòng nhập họ tên!' }],
      render: () => (
        <Input
          prefix={<UserOutlined />}
          placeholder="Nhập họ tên"
        />
      )
    },
    {
      name: 'email',
      label: 'Email',
      rules: [
        { required: true, message: 'Vui lòng nhập email!' },
        { type: 'email', message: 'Email không hợp lệ!' }
      ],
      render: () => (
        <Input
          prefix={<MailOutlined />}
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
    },
    {
        name: 'repassword',
        label: 'Nhập lại mật khẩu',
        dependencies: ['password'],
        rules: [
          { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu không khớp!'));
            }
          })
        ],
        render: () => (
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Nhập lại mật khẩu"
          />
        )
    },
    {
      name: 'phone',
      label: 'Số điện thoại',
      rules: [{ required: true, message: 'Vui lòng nhập số điện thoại!' }],
      render: () => (
        <Input
          prefix={<PhoneOutlined />}
          placeholder="Nhập số điện thoại"
        />
      )
    }
  ];

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <Title level={3} className="auth-title">
          Đăng ký tài khoản
        </Title>
        <CustomForm fields={fields} onFinish={handleRegister} buttonText="Đăng ký" />
        <div>
          <a href="/login">Đã có tài khoản? Đăng nhập</a>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
