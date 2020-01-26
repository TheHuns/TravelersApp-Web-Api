// landingpage

import React, { useState, useEffect } from "react";
import axios from "axios";

// Icon Components
import SearchIcon from "./icons/SearchIcon";
import AnythingIcon from "./icons/AnythingIcon";
import CoffeeIcon from "./icons/CoffeeIcon";
import FoodIcon from "./icons/FoodIcon";
import DrinksIcon from "./icons/DrinksIcon";
import PeopleIcon from "./icons/PeopleIcon";

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
  }

  function handleTextInput(e) {
    updateInput(e.target.value);
  }

  function handleSearchSubmit() {
    console.log(`User searching for ${icon} in ${input}`);
  }

  return (
    <div id="landingContainer">
      <div className="overlay"></div>
      <div className="sign-in">
        <a href="#">Sign In</a>
      </div>
      <div className="search-area">
        {/* Main logo area */}
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

        {/* Selectable Icons */}
        <div className="icons">
          <div name="Anything" onClick={handleIconClick}>
            <svg id="anything-icon" viewBox="0 0 40 40" height="40">
              <AnythingIcon active={icon === "Anything" ? true : false} />
            </svg>
          </div>
          <div name="Coffee Shops" onClick={handleIconClick}>
            <svg
              id="coffee-icon"
              onClick={handleIconClick}
              viewBox="0 0 40 40"
              height="40"
            >
              <CoffeeIcon active={icon === "Coffee Shops" ? true : null} />
            </svg>
          </div>
          <div name="Restaurants" onClick={handleIconClick}>
            <svg
              id="food-icon"
              onClick={handleIconClick}
              viewBox="0 0 40 40"
              height="40"
            >
              <FoodIcon active={icon === "Restaurants" ? true : false} />
            </svg>
          </div>
          <div name="Bars and Nightlife" onClick={handleIconClick}>
            <svg
              id="drinks-icon"
              onClick={handleIconClick}
              viewBox="0 0 40 40"
              height="40"
            >
              <DrinksIcon
                active={icon === "Bars and Nightlife" ? true : false}
              />
            </svg>
          </div>
          <div name="People" onClick={handleIconClick}>
            <svg
              id="people-icon"
              onClick={handleIconClick}
              viewBox="0 0 40 40"
              height="40"
            >
              <PeopleIcon active={icon === "People"} />
            </svg>
          </div>
        </div>

        {/* Search Bar */}
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
              <svg
                className="seach-icon"
                viewBox="0 0 40 40"
                height="26"
                onClick={handleSearchSubmit}
              >
                <SearchIcon />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
