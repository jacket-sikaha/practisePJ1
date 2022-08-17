import "./index.css";
import React from "react";

export default function Click({ value, getInputValue }) {
  return (
    <div className="items" onClick={() => getInputValue(value)}>
      {value}
    </div>
  );
}
