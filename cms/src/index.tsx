import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./i18n/i18n";
import "styles/index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import jaJP from "antd/locale/ja_JP";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
export const router = createBrowserRouter([{ path: "*", element: <App /> }]);

root.render(
  <React.StrictMode>
    <ConfigProvider
      locale={jaJP}
      autoInsertSpaceInButton={false}
      theme={{
        token: {
          colorPrimary: "#26418E",
        },
      }}
      // getPopupContainer={(trigger: any) => trigger.parentElement}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
