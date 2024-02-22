import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
export default function RouteChild1() {
  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/todos/" + 6);
  // }, []);
  let i = 0;
  for (let index = 0; index < 9999999; index++) {
    i++;
  }
  return (
    <div>
      routeChild1
      <Outlet />
    </div>
  );
}
