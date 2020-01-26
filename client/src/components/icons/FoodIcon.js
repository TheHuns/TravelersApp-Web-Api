import React from "react";

export default function FoodIcon({ active }) {
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
      <path className="st0" d="M19.15,44" />
      <path className="st0" d="M18,42" />
      <path
        className="st1"
        d="M6,33l28.49-10.84C37.55,16.25,20.54,1.54,18.5,4.5l-1,2c-4.57,9.46-7.43,16.54-12,26L6,33z"
      />
      <path className="st1" d="M17.5,6.5c3.76-0.82,16.47,12.99,14.45,16.61" />
      <circle className="st2" cx="20.5" cy="14.5" r="1" />
      <circle className="st2" cx="20.5" cy="21.5" r="1" />
      <circle className="st2" cx="25.5" cy="19.5" r="1" />
      <circle className="st2" cx="14.5" cy="24.5" r="1" />
      <circle className="st2" cx="16.5" cy="18.5" r="1" />
    </svg>
  );
}
