import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import ErrorPage from "../page/Error";
import Root from "../page/Root";
import Calculation from "../page/Calculation";
import Test from "../page/Test";
import Test2 from "../page/Test2";
import RouteA from "../page/Route-child1";
import RouteB from "../page/Route-child2";
import Routefather from "../page/Route-father";
import { testAPI } from "../api";

// 原来的JSX 路由写法 => 类似js配置写法
// 基本上就是用一个新的root路由包裹原来routes下面的route路由，然后就是一个路由数组对象
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    /* 错误页面组件 所有路由无法匹配的时候，该路由负责兜底 */
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "calculation",
        // element: <Calculation />,
        // lazy: () => import("../page/Calculation"),
        loader: testAPI,
        async lazy() {
          let cm = await import("../page/Calculation");
          // console.log("cm", cm); // 只会在第一次跳转执行
          return { Component: cm.default };
        },
      },
      /* search-param传参方法 就不需要额外的路由配置*/
      {
        path: "test",
        element: <Test />,
      },
      /* 对于访问不带参数的路由情况，有显示需求的话就需要设置对应路由 */
      {
        path: "test2",
        element: <Test2 />,
      },
      /* param传参方法 所需要的路由配置*/ {
        path: "test2/:id/:name",
        element: <Test2 />,
      },
      // 子路由配置  就是单纯的路由嵌套
      {
        path: "route-father",
        // element: <Routefather />,
        // lazy: () => import("../page/Route-father"),
        async lazy() {
          let cm = await import("../page/Route-father");
          return { loader: cm.loader, Component: cm.default };
          return { Component: cm.default };
        },
        children: [
          { index: true, element: <RouteA /> },
          {
            path: "b",
            element: <RouteB />,
          },
        ],
      },
    ],
  },
]);

export default router;
