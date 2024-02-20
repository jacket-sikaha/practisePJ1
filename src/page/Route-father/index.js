import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Routefather() {
  //   console.log("params", params);
  return (
    <div>
      <div>Routefather</div>
      <Link to={"./"}>a</Link>
      <br></br>
      <Link to={"./b"}>b</Link>
      <br></br>
      <Link to={"/404"}>二级路由404</Link>
      {/* 二级路由出口 */}
      <Outlet></Outlet>
    </div>
  );
}
