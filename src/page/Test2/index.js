import React from "react";
import { useParams } from "react-router-dom";

export default function Test2() {
  const { id, name } = useParams();
  //   console.log("params", params);
  return (
    <div>
      Test2
      <div>{id}</div>
      <div>{name}</div>
    </div>
  );
}
