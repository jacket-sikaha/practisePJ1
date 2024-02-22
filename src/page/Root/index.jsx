import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function Root() {
  return (
    <>
      {/* 导航栏 */}
      <Link to={"/a"}>首页</Link>
      <br></br>
      <Link to={"/a/q"}>q</Link>
      {/* <a href={"/calculation"}>计算器</a> */}
      <br></br>
      <Link to={"/a/q/w"}>test</Link>
      <br></br>
      <Link to={"/a/q/w/e"}>test2</Link>
      <br></br>
      {/* <Link to={"/route-father"}>route-father</Link> */}
      <a href={"/a/q/w/e/r"}>route-father</a>
      <br></br>
      <hr />
      {/* root的子路由输出位置 */}
      <Outlet />
    </>
  );
}

export default Root;
