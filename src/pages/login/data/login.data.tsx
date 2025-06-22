import type { FieldConfig } from '@/components/share/customForm'
export const fields: FieldConfig[] = [
    { name: 'username', label: 'Tên đăng nhập', type: 'text' },
    { name: 'password', label: 'Mật khẩu', type: 'password' },
    { name: 'remember', label: 'Ghi nhớ đăng nhập', type: 'checkbox' }
  ];