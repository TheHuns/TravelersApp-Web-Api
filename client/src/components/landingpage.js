// landingpage

import React, {useState, useEffect} from 'react';
import axios from 'axios';

function LandingPage() {

	const [icon, chooseIcon] = useState('Anything');
	const [input, updateInput] = useState("");
	const [placeholder, setPlaceholder] = useState("Enter a City and State or a Zipcode")

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(displayLocationInfo)
		}
	})

	function displayLocationInfo(position) {
		const lng = position.coords.longitude;
		const lat = position.coords.latitude;
		const API_KEY = `${process.env.REACT_APP_GEO_CODER_API_KEY}`;
		axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${API_KEY}`)
			.then((response) => {
				let city = response.data.results[0].components.town
				let state = response.data.results[0].components.state_code
				setPlaceholder(`${city}, ${state}`)
			}, (error) => {
				console.log(error)
			})
	}

	function handleIconClick(e) {
		chooseIcon(e.target.getAttribute('name'))
	}

	function handleTextInput(e){
		updateInput(e.target.value )
	}

	return (
		<div id="landingContainer">
			<a href="#" className="SignIn">Sign In</a>
			<h1>5OclockFriends!!</h1>
			<div className="icons">
				<p onClick={handleIconClick} name='Anything' className="icon">All</p>
				<p onClick={handleIconClick} name='Coffee Shops' className="icon">Coffee Shops</p>
				<p onClick={handleIconClick} name='Restaurants' className="icon">Restaurants</p>
				<p onClick={handleIconClick} name='Bars & Nightlife' className="icon">Bars & Nightlife</p>
				<p onClick={handleIconClick} name='People' className="icon">People</p>
			</div>
			<div className="Searchfield">
				<p>Find {icon} in...</p>
				<input onChange={handleTextInput} type="text" placeholder={placeholder} className="searchInput" />
			</div>

		</div>
	)
}

export default LandingPage