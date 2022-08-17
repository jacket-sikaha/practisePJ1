import React from "react";
import Click from "../Click";
import "./index.css";

export default function Control({ getInputValue }) {
  const button = [
    "C",
    "del",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "change",
    "0",
    ".",
    "=",
  ];
  return (
    <div className="control">
      {button.map((val, index) => (
        <div key={index}>
          <Click key={index} value={val} getInputValue={getInputValue} />
        </div>
      ))}
    </div>
  );
}
