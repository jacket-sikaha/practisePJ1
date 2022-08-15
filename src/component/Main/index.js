import React from "react";
import "./index.css";
export default function Main({ presentVal, result }) {
  return (
    <div>
      <div className="headLayout">
        <div>计算</div>
        <div>换算</div>
        <div>税贷</div>
      </div>
      <div className="mainLayout">{presentVal}</div>
      <div>= 结果</div>
    </div>
  );
}
