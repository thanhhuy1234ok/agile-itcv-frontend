import type { FieldConfig } from '@/components/share/customForm'

export const fields: FieldConfig[] = [
  {
    name: 'username',
    label: 'Tên đăng nhập',
    type: 'text',
    rules: [{ required: true, message: 'Vui lòng nhập Tên đăng nhập' }],
  },
  {
    name: 'password',
    label: 'Mật khẩu',
    type: 'password',
    rules: [{ required: true, message: 'Vui lòng nhập Mật khẩu' }],
  },
  {
    name: 'remember',
    label: 'Ghi nhớ đăng nhập',
    type: 'checkbox', 
  },
];