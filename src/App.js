//引入组件
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./route";

//路由配置
export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
