import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import viVN from "antd/locale/vi_VN";
import { router } from "@/routers/router.jsx";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { AuthProvider } from "@/global/AuthenticationContext";
import store from "@/redux/store";
import "@/styles/style.scss"; // Import your global styles here

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ConfigProvider locale={viVN}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
