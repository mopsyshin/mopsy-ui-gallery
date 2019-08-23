import React from "react";

const IcArrow = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <polyline
        fill="none"
        stroke={props.color ? props.color : "#454545"}
        strokeLinecap="round"
        strokeLinejoin="round"
        points="5 9 12 16 19 9"
      />
    </svg>
  );
};

export default IcArrow;
