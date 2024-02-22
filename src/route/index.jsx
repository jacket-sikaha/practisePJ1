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
    errorElement: <ErrorPage />,
    children: [
      {
        // index: true,
        // 索引路由是指根据路径匹配到的默认路由，相当于根路径或基本路径。索引路由不应具有子元素，因为它们不会被渲染
        path: "a",
        // element: <Home />,
        async lazy() {
          let cm = await import("../page/Home");
          return { Component: cm.default };
        },
        children: [
          {
            path: "q",
            // element: <RouteA />,
            async lazy() {
              let cm = await import("../page/Route-child1");
              return { Component: cm.default };
            },
            loader: () =>
              fetch("https://jsonplaceholder.typicode.com/todos/" + 6),
            children: [
              {
                path: "w",
                // element: <RouteB />,
                async lazy() {
                  let cm = await import("../page/Route-child2");
                  return { Component: cm.default };
                },
                loader: () =>
                  fetch("https://jsonplaceholder.typicode.com/todos/" + 6),
                children: [
                  {
                    path: "e",
                    // element: <RouteA />,
                    async lazy() {
                      let cm = await import("../page/Route-child1");
                      return { Component: cm.default };
                    },
                    loader: () =>
                      fetch("https://jsonplaceholder.typicode.com/todos/" + 6),
                    children: [
                      {
                        path: "r",
                        // element: <RouteB />,
                        async lazy() {
                          let cm = await import("../page/Route-child2");
                          return { Component: cm.default };
                        },
                        loader: () =>
                          fetch(
                            "https://jsonplaceholder.typicode.com/todos/" + 6
                          ),
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "aa",
        element: <Calculation />,
      },
    ],
  },
]);

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
//         element: <Home />,
//         children: [
//           {
//             path: "q",
//             element: <RouteA />,
//             loader: () =>
//               fetch("https://jsonplaceholder.typicode.com/todos/" + 6),
//             children: [
//               {
//                 path: "w",
//                 element: <RouteB />,
//                 loader: () =>
//                   fetch("https://jsonplaceholder.typicode.com/todos/" + 6),
//                 children: [
//                   {
//                     path: "e",
//                     element: <RouteA />,
//                     loader: () =>
//                       fetch("https://jsonplaceholder.typicode.com/todos/" + 6),
//                     children: [
//                       {
//                         path: "r",
//                         element: <RouteB />,
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

export default router;
