import "./index.css";
import React from "react";

export default function Click({ value, getValue }) {
  return (
    <div className="items" onClick={() => getValue(value)}>
      {value}
    </div>
  );
}
