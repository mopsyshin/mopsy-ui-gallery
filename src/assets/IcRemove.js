import React from "react";

const IcRemove = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
    >
      <g fill="none" fillRule="evenodd" strokeLinecap="round">
        <path
          stroke={props.color ? props.color : "#454545"}
          d="M10,2 L2,10" />
        <path
          stroke={props.color ? props.color : "#454545"}
          d="M10,2 L2,10"
          transform="rotate(-90 6 6)"
        />
      </g>
    </svg>
  );
};

export default IcRemove;
