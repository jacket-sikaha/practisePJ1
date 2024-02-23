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
import { delayForDemo, testAPI } from "../api";
import { lazy } from "react";

// 原来的JSX 路由写法 => 类似js配置写法
// 基本上就是用一个新的root路由包裹原来routes下面的route路由，然后就是一个路由数组对象
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         // index: true,
//         // 索引路由是指根据路径匹配到的默认路由，相当于根路径或基本路径。索引路由不应具有子元素，因为它们不会被渲染
//         path: "a",
//         // element: <Home />,
//         async lazy() {
//           let cm = await import("../page/Home");
//           return { Component: cm.default };
//         },
//         children: [
//           {
//             path: "q",
//             // element: <RouteA />,
//             async lazy() {
//               let cm = await import("../page/Route-child1");
//               return { Component: cm.default };
//             },
//             // loader: async () => fetch("https://t.mwm.moe/mp"),
//             children: [
//               {
//                 path: "w",
//                 // element: <RouteB />,
//                 async lazy() {
//                   let cm = await import("../page/Route-child2");
//                   return { Component: cm.default };
//                 },
//                 loader: () => fetch("https://t.mwm.moe/mp"),
//                 children: [
//                   {
//                     path: "e",
//                     // element: <RouteA />,
//                     async lazy() {
//                       let cm = await import("../page/Route-child1");
//                       return { Component: cm.default };
//                     },
//                     loader: () => fetch("https://t.mwm.moe/mp"),
//                     children: [
//                       {
//                         path: "r",
//                         // element: <RouteB />,
//                         async lazy() {
//                           let cm = await import("../page/Route-child2");
//                           return { Component: cm.default };
//                         },
//                         loader: () =>
//                           fetch(
//                             "https://jsonplaceholder.typicode.com/todos/" + 6
//                           ),
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         path: "aa",
//         element: <Calculation />,
//       },
//     ],
//   },
// ]);

// 普通版本
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "a",
//         element: <Home />,
//         children: [
//           {
//             path: "q",
//             element: <RouteA />,
//             children: [
//               {
//                 path: "w",
//                 element: <RouteB />,
//                 children: [
//                   {
//                     path: "e",
//                     element: <RouteA />,
//                     children: [
//                       {
//                         path: "r",
//                         element: <RouteB />,
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ]);

// 懒加载 + loader方式并行获取数据（可以选择是否注释查看区别）
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "a",
        element: <Home />,
        children: [
          {
            path: "q",
            // loader: async () => fetch("https://t.mwm.moe/mp"),
            async lazy() {
              return {
                Component: lazy(() =>
                  delayForDemo(import("../page/Route-child1"))
                ),
              };
            },
            children: [
              {
                path: "w",
                // loader: async () => fetch("https://t.mwm.moe/mp"),
                async lazy() {
                  return {
                    Component: lazy(() =>
                      delayForDemo(import("../page/Route-child2"))
                    ),
                  };
                },
                children: [
                  {
                    path: "e",
                    // loader: async () => fetch("https://t.mwm.moe/mp"),
                    async lazy() {
                      return {
                        Component: lazy(() =>
                          delayForDemo(import("../page/Route-child1"))
                        ),
                      };
                    },
                    children: [
                      {
                        path: "r",
                        // loader: async () => fetch("https://t.mwm.moe/mp"),
                        async lazy() {
                          return {
                            Component: lazy(() =>
                              delayForDemo(import("../page/Route-child2"))
                            ),
                          };
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
