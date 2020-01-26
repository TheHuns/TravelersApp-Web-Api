import React from "react";

export default function AnythingIcon({ active }) {
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
      <g>
        <path
          className="st0"
          d="M20.5,3C29.6,3,37,10.4,37,19.5S29.6,36,20.5,36S4,28.6,4,19.5S11.4,3,20.5,3 M20.5,2C10.84,2,3,9.84,3,19.5
		S10.84,37,20.5,37S38,29.16,38,19.5S30.16,2,20.5,2L20.5,2z"
        />
      </g>
      <g>
        <path
          className="st0"
          d="M20.5,3c4.07,0,7.5,7.56,7.5,16.5S24.57,36,20.5,36S13,28.44,13,19.5S16.43,3,20.5,3 M20.5,2
		C15.81,2,12,9.84,12,19.5S15.81,37,20.5,37S29,29.16,29,19.5S25.19,2,20.5,2L20.5,2z"
        />
      </g>
      <g>
        <line className="st1" x1="3.5" y1="19.5" x2="37.5" y2="19.5" />
      </g>
      <line className="st1" x1="20.5" y1="36.5" x2="20.5" y2="2.5" />
      <path className="st1" d="M33.5,30.5" />
      <path className="st1" d="M7.5,30.5c0-5,26-5,26,0" />
      <path className="st1" d="M7.5,8.5c0,5,26,5,26,0" />
    </svg>
  );
}
