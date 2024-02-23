import React, { Suspense, useEffect } from "react";
import { testAPI } from "../../api";
import { Outlet } from "react-router-dom";

export default function RouteChild2() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // 遵循瀑布流 先加载页面---加载js---路由懒加载---请求数据
    // testAPI();
    fetch("https://t.mwm.moe/mp");
  }, []);

  return (
    <Suspense fallback={<div>loading</div>}>
      <div>
        routeChild2
        <Outlet />
      </div>
    </Suspense>
  );
}
