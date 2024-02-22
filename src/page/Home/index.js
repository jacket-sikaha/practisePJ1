import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const go = () => {
    // navigate("/calculation");
    navigate("/calculation", { replace: true }); //直接替换当前的路由，不会添加新的历史记录
  };
  const gotest = () => {
    navigate("/test?id=6&name=sikara&id=666");
  };
  const gotest2 = () => {
    navigate("/test2/123/sikara/");
    //路由的跳转与匹配遵循一一对应   多一个少一个可能就会跳转失败  如以下情况不对应就跳转失败
    // navigate("/test2/123/sikara/dvsd");
  };

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/todos/" + 6);
  // }, []);

  return (
    <>
      <div>Home</div>
      <button onClick={go}>跳转到calculate</button>
      <button onClick={gotest}>跳转到test</button>
      <button onClick={gotest2}>跳转到param</button>
      <Outlet />
    </>
  );
}
