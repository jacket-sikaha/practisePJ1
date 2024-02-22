import { useLayoutEffect, Suspense, useEffect } from "react";
import { Await } from "react-router-dom";
import { defer } from "react-router-dom";
import { useAsyncValue } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import { testAPI } from "../../api";

export async function loader({ params }) {
  return defer({
    data: testAPI(),
  });
}

export default function Routefather() {
  //   console.log("params", params);
  useLayoutEffect(() => {
    // 遵循瀑布流 先加载页面---加载js---路由懒加载---请求数据
    fetch("https://jsonplaceholder.typicode.com/todos/2").then((response) =>
      response.json()
    );
  }, []);
  const data = useLoaderData();
  console.log("data", data);

  return (
    <div>
      <div>Routefather</div>
      <Link to={"./"}>a</Link>
      <br></br>
      <Link to={"./b"}>b</Link>
      <br></br>
      <Link to={"/404"}>二级路由404</Link>
      <h3>data:{JSON.stringify(data)}</h3>
      <br></br>
      <Suspense fallback={<p>Loading package location...</p>}>
        <Await
          resolve={data.data}
          errorElement={<p>Error loading package location!</p>}
        >
          <PackageLocation />
        </Await>
      </Suspense>
      {/* 二级路由出口 */}
      <Outlet></Outlet>
    </div>
  );
}

function PackageLocation() {
  const packageLocation = useAsyncValue();
  console.log("packageLocation", packageLocation);
  return (
    <div>
      <h4>data:{JSON.stringify(packageLocation)}</h4>
    </div>
  );
}
