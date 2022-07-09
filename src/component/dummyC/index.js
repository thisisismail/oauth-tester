import React from "react";
import { useSelector } from "react-redux";

export default function DummyC() {
  const storedData = useSelector((state) => state.counterReducer);
  const data = storedData.title ?? "";
  return (
    <div>
      <div>This is the Component</div>
      <div>{data}</div>
    </div>
  );
}
