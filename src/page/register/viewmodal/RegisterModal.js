"use client";

import { useState } from "react";
import { notification } from "antd";
import { register } from "../../../services/api";
import { useNavigate } from "react-router-dom";

const useRegisterModal = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const response = await register({
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
      });

      if (response.code === 1) {
        notification.success({
          message: "Đăng ký thành công!",
          description: "Chúc mừng bạn đã đăng ký tài khoản thành công.",
        });
        // Redirect to login page after successful registration
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        notification.error({
          message: "Đăng ký thất bại",
          description: response.message || "Có lỗi xảy ra!",
        });
      }
    } catch (error) {
      notification.error({
        message: "Lỗi kết nối",
        description: error.message || "Không thể kết nối máy chủ.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading };
};

export default useRegisterModal;
