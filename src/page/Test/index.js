import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Test() {
  // 路由跳转传参方式
  // 1 SearchParams
  // /calculation?id=6&name=sikara
  // 2 Params
  const [params] = useSearchParams();
  const id = params.get("id");
  const name = params.get("name");
  const iss = params.getAll("id");
  console.log("iss", iss);
  useEffect(() => {
    console.log(params.toString());
  });
  return (
    <>
      <div>Test</div>
      <div>
        {id},{name}
      </div>
      {iss.map((val) => (
        <div>{"test" + val}</div>
      ))}
    </>
  );
}
