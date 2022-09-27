//引入组件
import React from "react";
import Calculation from "./page/Calculation";
import Home from "./page/Home";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
//路由配置
export default function App() {
  return (
    <BrowserRouter>
      <Link to={"/"}>首页</Link>
      <Link to={"/calculation"}>计算器</Link>

      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/calculation"
          element={<Calculation></Calculation>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
