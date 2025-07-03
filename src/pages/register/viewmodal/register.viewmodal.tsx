import type { RegisterFormValues } from '@/types/form';
import { message } from 'antd';
import { register } from '@/services/api';
import { useNavigate } from 'react-router-dom'; 

export const RegisterModal = () => {
  const navigate = useNavigate(); 

  const handleSubmit = async (values: RegisterFormValues) => {
    if (values.password !== values.confirmPassword) {
      message.error('Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }

    const { confirmPassword, agree, ...userData } = values;
    console.log('Dữ liệu đăng ký:', userData);

    try {
      const res = await register(userData);
      if (res.data.code === 1) {
        message.success(res.data.message || 'Đăng ký thành công!');
        navigate('/login'); 
      } else {
        message.error(res.data.message || 'Đăng ký thất bại!');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Đã có lỗi xảy ra!');
    }
  };

  return {
    handleSubmit
  };
};
