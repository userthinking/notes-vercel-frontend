import React from "react";

const Colors = ({ color }) => {
  return (
    <div
      className="h-4 w-4 rounded-full cursor-pointer"
      style={{ backgroundColor: color }}
    ></div>
  );
};

export default Colors;
