import React from "react";

export default function DrinksIcon({ active }) {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      className={active ? "active" : null}
    >
      <polygon
        className="st0"
        points="29.5,9.5 17.5,23.5 6.5,9.5 7,9.5 29,9.5 "
      />
      <line className="st0" x1="17.5" y1="35.5" x2="17.5" y2="23.5" />
      <line className="st0" x1="8.5" y1="35.5" x2="27.5" y2="35.5" />
      <path
        className="st0"
        d="M30,12.5c2.49,0,4.5-2.01,4.5-4.5S32.49,3.5,30,3.5S25.5,5.51,25.5,8"
      />
      <path className="st0" d="M34,22.5" />
      <path className="st0" d="M29.5,18" />
    </svg>
  );
}
