import React from 'react';
import CustomForm from '@/components/share/customForm';
import type { FieldConfig } from '@/components/share/customForm';
import { message } from 'antd';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  agree: boolean;
}

const RegisterPage: React.FC = () => {
  const fields: FieldConfig[] = [
  { name: 'name', label: 'Họ và tên', type: 'text', rules: [{ required: true, message: 'Vui lòng nhập Họ và tên' }] },
  { name: 'email', label: 'Email', type: 'email', rules: [{ required: true, message: 'Vui lòng nhập Email' }] },
  { name: 'password', label: 'Mật khẩu', type: 'password', rules: [{ required: true, message: 'Vui lòng nhập Mật khẩu' }] },
  { name: 'confirmPassword', label: 'Nhập lại mật khẩu', type: 'password', rules: [{ required: true, message: 'Vui lòng nhập lại Mật khẩu' }] },
  { name: 'phone', label: 'Số điện thoại', type: 'text', rules: [{ required: true, message: 'Vui lòng nhập Số điện thoại' }] },
  {
    name: 'agree',
    label: 'Tôi đồng ý với điều khoản sử dụng',
    type: 'checkbox',
    rules: [
      {
        validator: (_: unknown, value: boolean) =>
          value ? Promise.resolve() : Promise.reject('Bạn cần đồng ý với điều khoản.'),
      },
    ],
  },
];

  const handleSubmit = (values: RegisterFormValues) => {
    if (values.password !== values.confirmPassword) {
      message.error('Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }

    const { confirmPassword, ...userData } = values;
    console.log('Dữ liệu đăng ký:', userData);

    // TODO: Gọi API đăng ký tại đây
    message.success('Đăng ký thành công!');
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', paddingTop: 40 }}>
      <CustomForm<RegisterFormValues>
        title="Đăng ký tài khoản"
        fields={fields}
        submitText="Đăng ký"
        onFinish={handleSubmit}
      />
    </div>
  );
};

export default RegisterPage;
