import React from "react";

export default function CoffeeIcon({ active }) {
  return (
    <svg
      version="1.1"
      className={active ? "active" : null}
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
    >
      <g>
        <path
          className="st0"
          d="M30,6v15.12c0,4.64-2.88,7.88-7,7.88H12.88C8.53,29,5,25.47,5,21.12V6H30 M30.99,4H4.01C3.45,4,3,4.45,3,5.01
		v16.11C3,26.58,7.42,31,12.88,31H23c5.46,0,9-4.42,9-9.88V5.01C32,4.45,31.55,4,30.99,4L30.99,4z"
        />
      </g>
      <path className="st1" d="M31.5,8.5C41,8,40,21,32,21" />
      <line className="st1" x1="2.5" y1="34.5" x2="38.5" y2="34.5" />
    </svg>
  );
}
