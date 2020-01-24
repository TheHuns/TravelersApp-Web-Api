// landingpage

import React, { useState, useEffect } from "react";
import axios from "axios";

function LandingPage() {
  const [icon, chooseIcon] = useState("Anything");
  const [input, updateInput] = useState("");
  const [placeholder, setPlaceholder] = useState(
    "Enter a City and State or a Zipcode"
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(displayLocationInfo);
    }
  }, []);

  function displayLocationInfo(position) {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;
    const API_KEY = `${process.env.REACT_APP_GEO_CODER_API_KEY}`;
    axios
      .get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${API_KEY}`
      )
      .then(
        response => {
          console.log(response);
          if (response.data.results.length) {
            if (
              response.data.results[0].components.town ||
              (response.data.results[0].components.city &&
                response.data.results[0].components.state_code)
            ) {
              let city =
                response.data.results[0].components.town ||
                response.data.results[0].components.city;
              let state = response.data.results[0].components.state_code;
              setPlaceholder(`${city}, ${state}`);
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  function handleIconClick(e) {
    chooseIcon(e.target.getAttribute("name"));
    e.target.className = "play60";
  }

  function handleTextInput(e) {
    updateInput(e.target.value);
  }

  return (
    <div id="landingContainer">
      <div className="overlay"></div>
      <div className="sign-in">
        <a href="#">Sign In</a>
      </div>
      <div className="search-area">
        <svg version="1.1" id="logo" x="0px" y="0px" viewBox="0 0 540 230">
          <text
            transform="matrix(1.0708 0 0 1 -4.3916 221.2207)"
            className="st0 st1"
          >
            5
          </text>
          <text
            transform="matrix(1 0 0 1 139.5039 88.3936)"
            className="st0 st2"
          >
            O’Clock
          </text>
          <text
            transform="matrix(1 0 0 1 139.1416 208.916)"
            className="st0 st3"
          >
            Friends
          </text>
        </svg>
        <div className="icons">
          <div
            id="anything-icon"
            onClick={handleIconClick}
            name="Anything"
          ></div>
          <div
            id="coffee-icon"
            onClick={handleIconClick}
            name="Coffee Shops"
          ></div>
          <div
            id="food-icon"
            onClick={handleIconClick}
            name="Restaurants"
          ></div>
          <div
            id="drinks-icon"
            onClick={handleIconClick}
            name="Bars and Nightlife"
          ></div>
          <div id="people-icon" onClick={handleIconClick} name="People"></div>
        </div>
        <div className="search-field">
          <p>Find {icon} in...</p>
          <div className="search-bar">
            <input
              onChange={handleTextInput}
              type="text"
              placeholder={placeholder}
              className="searchInput"
            />
            <div className="search-button">
              <div className="seach-icon"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
