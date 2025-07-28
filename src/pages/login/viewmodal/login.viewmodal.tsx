import { message } from "antd";
import { useCurrentApp } from "@/context/app.context";
import { useNavigate } from "react-router-dom";
import { login } from "@/services/api";
import type { LoginFormValues } from "@/types/form";

export const LoginModal = () => {
  const navigate = useNavigate();
  const { onLogin } = useCurrentApp();
  const handleLogin = async (values: LoginFormValues) => {
    try {
      const res = await login({
        email: values.username,
        password: values.password,
      });
      if (res.data.code === 1) {
        message.success(res.data.message);
        const accessToken = res.data.data.access_Token;
        const user = res.data.data.user;
        onLogin(user, accessToken);
        if (res.data.data.user.role.name === "Admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        message.error(res.data.message);
      }
    } catch (err: any) {
      console.error("Login failed:", err.response?.data?.message);
      message.error(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return { handleLogin };
};
