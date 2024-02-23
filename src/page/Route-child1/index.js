import React, { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
export default function RouteChild1() {
  useEffect(() => {
    fetch("https://t.mwm.moe/mp");
  }, []);
  return (
    <Suspense fallback={<div>loading</div>}>
      <div>
        routeChild1
        <Outlet />
      </div>
    </Suspense>
  );
}
