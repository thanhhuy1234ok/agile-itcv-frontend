import type { RegisterFormValues } from '@/pages/register/dto/register.dto';
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
      if (res.code === 1) {
        message.success(res.message || 'Đăng ký thành công!');
        navigate('/login'); 
      } else {
        message.error(res.message || 'Đăng ký thất bại!');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Đã có lỗi xảy ra!');
    }
  };

  return {
    handleSubmit
  };
};
