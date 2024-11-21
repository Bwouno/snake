import React from "react";

const Food = ({ dot }) => {
  return (
    <div
      className="snake-food"
      style={{ left: `${dot[0]}px`, top: `${dot[1]}px` }}
    ></div>
  );
};

export default Food;
