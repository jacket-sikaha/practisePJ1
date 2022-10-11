//引入组件
import React from "react";
import Calculation from "./page/Calculation";
import Home from "./page/Home";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Test from "./page/Test";
import Test2 from "./page/Test2";
import Routefather from "./page/Route-father";
import RouteA from "./page/Route-child1";
import RouteB from "./page/Route-child2";
//路由配置
export default function App() {
  return (
    <BrowserRouter>
      <Link to={"/"}>首页</Link>
      <br></br>
      <Link to={"/calculation"}>计算器</Link>
      <br></br>
      <Link to={"/test"}>test</Link>
      <br></br>
      <Link to={"/test2"}>test2</Link>
      <br></br>
      <Link to={"/route-father"}>route-father</Link>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/calculation" element={<Calculation />}></Route>
        {/* search-param传参方法 就不需要额外的路由配置*/}
        <Route path="/test" element={<Test />}></Route>
        {/* 对于不带参数的情况，有显示需求的话就需要设置对应路由 */}
        <Route path="/test2" element={<Test2 />}></Route>
        {/* param传参方法 所需要的路由配置*/}
        <Route path="/test2/:id/:name" element={<Test2 />}></Route>

        {/* 子路由配置  就是单纯的路由嵌套 */}
        <Route path="/route-father" element={<Routefather />}>
          {/* index默认显示 使用该属性就不需要配置path属性了*/}
          <Route index element={<RouteA />}></Route>
          <Route path="b" element={<RouteB />}></Route>
        </Route>

        {/* 404路由 以上路由无法匹配的时候，该路由负责兜底*/}
        <Route path="*" element={<Calculation />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
