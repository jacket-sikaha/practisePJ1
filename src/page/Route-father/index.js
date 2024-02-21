import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";

// export async function loader({ request }) {
//   let data = await fetchData(request);
//   return json(data);
// }

export default function Routefather() {
  //   console.log("params", params);
  useEffect(() => {
    // 遵循瀑布流 先加载页面---加载js---路由懒加载---请求数据
    fetch("https://jsonplaceholder.typicode.com/todos/2")
      .then((response) => response.json())
      .then(console.log);
  }, []);
  const data = useLoaderData();
  return (
    <div>
      <div>Routefather</div>
      <Link to={"./"}>a</Link>
      <br></br>
      <Link to={"./b"}>b</Link>
      <br></br>
      <Link to={"/404"}>二级路由404</Link>
      <h3>data:{JSON.stringify(data)}</h3>
      {/* 二级路由出口 */}
      <Outlet></Outlet>
    </div>
  );
}
