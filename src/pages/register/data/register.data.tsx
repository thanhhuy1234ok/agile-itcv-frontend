import type { FieldConfig } from '@/components/share/customForm';

export const fields: FieldConfig[] = [
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