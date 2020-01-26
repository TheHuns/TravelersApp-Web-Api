import React from "react";

export default function PeopleIcon({ active }) {
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
          d="M21,5c4.41,0,8,3.59,8,8s-3.59,8-8,8s-8-3.59-8-8S16.59,5,21,5 M21,4c-4.97,0-9,4.03-9,9s4.03,9,9,9
		s9-4.03,9-9S25.97,4,21,4L21,4z"
        />
      </g>
      <g>
        <path
          className="st0"
          d="M7.99,22c4.15,1.57,8.36,2.37,12.51,2.37c4.16,0,8.37-0.8,12.51-2.37c1.66,0.09,2.99,1.47,2.99,3.15V32H5
		v-6.84C5,23.47,6.32,22.09,7.99,22 M32.84,21c-4.11,1.58-8.23,2.37-12.34,2.37S12.27,22.58,8.16,21C5.86,21,4,22.86,4,25.16V33h33
		v-7.84C37,22.86,35.14,21,32.84,21L32.84,21z"
        />
      </g>
    </svg>
  );
}
