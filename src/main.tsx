import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@/routers/router";
import enUS from "antd/locale/en_US";
import { App, ConfigProvider } from "antd";
import { AppProvider } from "./context/app.context";
import "@/styles/style.scss";
createRoot(document.getElementById("root")!).render(
  <App>
    <AppProvider>
      <ConfigProvider locale={enUS}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </AppProvider>
  </App>
);
