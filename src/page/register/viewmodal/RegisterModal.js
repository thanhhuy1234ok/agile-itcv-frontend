import { notification } from 'antd';
import { register } from '../../../services/api';

const useRegisterModal = () => {
  const handleRegister = async (values) => {
    try {
      const response = await register({
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
      });

      if (response.code === 1) {
        notification.success({
          message: 'Đăng ký thành công!',
          description: 'Chúc mừng bạn đã đăng ký tài khoản thành công.',
        });
      } else {
        notification.error({
          message: 'Đăng ký thất bại',
          description: response.message || 'Có lỗi xảy ra!',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Lỗi kết nối',
        description: error.message || 'Không thể kết nối máy chủ.',
      });
    }
  };

  return { handleRegister };
};

export default useRegisterModal;
