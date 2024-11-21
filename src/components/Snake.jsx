import React from "react";

const Snake = ({ snakeDots }) => {
  return (
    <>
      {snakeDots.map((dot, i) => (
        <div
          className="snake-dot"
          key={i}
          style={{ left: `${dot[0]}px`, top: `${dot[1]}px` }}
        ></div>
      ))}
    </>
  );
};

export default Snake;
