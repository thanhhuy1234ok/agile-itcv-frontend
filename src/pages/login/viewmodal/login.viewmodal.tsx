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

      if (res?.data?.code === 1) {
        (window as any).messageApi?.success(res.data.message);
        const { access_Token, user } = res.data.data;
        onLogin(user, access_Token);
        navigate(user.role?.name === "Admin" ? "/admin" : "/");
      } else {
        (window as any).messageApi?.error(
          res.data.message || "Sai thông tin đăng nhập"
        );
      }
    } catch (err: any) {
      console.error("Login failed:", err.response?.data?.message);
      (window as any).messageApi?.error(
        err.response?.data?.message || "Đăng nhập thất bại"
      );
    }
  };

  return { handleLogin };
};
