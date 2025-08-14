import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@/routers/router";
import enUS from "antd/locale/en_US";
import { App as AntdApp, ConfigProvider, message } from "antd";
import { AppProvider } from "./context/app.context";
import "@/styles/style.scss";

const Root = () => {
  const [messageApi, contextHolder] = message.useMessage();

  (window as any).messageApi = messageApi;

  return (
    <AntdApp>
      {contextHolder}
      <AppProvider>
        <ConfigProvider locale={enUS}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </AppProvider>
    </AntdApp>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
