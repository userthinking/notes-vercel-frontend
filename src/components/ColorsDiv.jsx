import React from "react";
import Colors from "./Colors";

const ColorsDiv = () => {
  const colors = ["#FEC971", "#FE9B72", "#B693FD", "#B693FF", "#E3EF90"];
  return (
    <div className="h-auto w-auto p-2 mt-4 flex flex-col items-center justify-center gap-4">
      {colors.map((color, idx) => (
        <Colors color={color} key={idx} />
      ))}
    </div>
  );
};

export default ColorsDiv;
