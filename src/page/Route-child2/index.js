import React, { useEffect } from "react";
import { testAPI } from "../../api";
import { Outlet } from "react-router-dom";

export default function RouteChild2() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   // 遵循瀑布流 先加载页面---加载js---路由懒加载---请求数据
  //   // testAPI();
  //   fetch("https://jsonplaceholder.typicode.com/todos/" + 6);
  // }, []);

  let i = 0;
  for (let index = 0; index < 9999999; index++) {
    i++;
  }
  return (
    <div>
      Route-child2 <Outlet />
    </div>
  );
}
