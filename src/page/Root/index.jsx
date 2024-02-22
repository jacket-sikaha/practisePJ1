import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function Root() {
  return (
    <>
      {/* 导航栏 */}
      <Link to={"/"}>首页</Link>
      <br></br>
      <Link to={"/calculation"}>计算器</Link>
      {/* <a href={"/calculation"}>计算器</a> */}
      <br></br>
      <Link to={"/test"}>test</Link>
      <br></br>
      <Link to={"/test2"}>test2</Link>
      <br></br>
      {/* <Link to={"/route-father"}>route-father</Link> */}
      <a href={"/route-father"}>route-father</a>
      <br></br>
      <Link to={"/404"}>404</Link>
      <hr />
      {/* root的子路由输出位置 */}
      <Outlet />
    </>
  );
}

export default Root;
