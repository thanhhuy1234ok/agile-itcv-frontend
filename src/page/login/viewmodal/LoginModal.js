import { useNavigate } from 'react-router-dom';
import { login } from '../../../services/api';
import { notification } from 'antd';
import { useDispatch } from 'react-redux';
import { onLogin } from '../../../redux/authSlice';

export const useLoginModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (values) => {
        try {
            const response = await login({ email: values.email, password: values.password }); 
            if (response.code === 1) {
                dispatch(onLogin({response})) 
                notification.success({
                    message: 'Đăng nhập thành công',
                    description: `Chào mừng bạn trở lại, ${response.data?.name || 'người dùng'}!`,
                    duration: 2,
                });
                navigate('/'); 
            } else {
                notification.error({
                    message: 'Đăng nhập thất bại',
                    description: response.message || 'Không nhận được dữ liệu từ máy chủ.',
                    duration: 2,
                });
            }
        } catch (error) {
            notification.error({
                message: 'Đăng nhập thất bại',
                description: error?.response?.data?.message || error.message || 'Đã xảy ra lỗi.',
                duration: 2,
            });
        }
    };

    return {
        handleLogin,
    };
};
