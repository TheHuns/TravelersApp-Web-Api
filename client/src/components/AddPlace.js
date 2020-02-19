// Form to add places

// imports
import React, { useState } from "react";
import { gql } from 'apollo-boost';
import { graphql } from "react-apollo";
import { useMutation } from '@apollo/react-hooks';

const AddPlaceForm = () => {

	const ADD_PLACE = gql`
		mutation($businessName: String!, $category: String!, $website: String!, $phone: Number!,
		 $address: String, $state: String, $locationId: ID!, $monday: Array, $tuesday: Array,
		  $wednesday: Array, $thursday: Array, $friday: Array, $saturday: Array, $sunday: Array) {
  			addVenue(
    			venueInfo: {
				    businessName: $businessName
				    category: $category
				    website: $website
				    phone: $phone
				    address: $address
				    state: $state,
				    locationId: $locationId
    			},
    			hoursInfo: {      
			       monday: $monday
			       tuesday: $tuesday
			       wednesday: $wednesday
			       thursday: $thursday
			       friday: $friday
			       saturday: $saturday
			       sunday: $sunday
    			}
  			) {
    		businessName
    		id
  			}
		}
	`;

	const States = [
		{
		  name: "Alabama",
		  abbreviation: "AL"
		},
		{
		  name: "Alaska",
		  abbreviation: "AK"
		},
		{
		  name: "Arizona",
		  abbreviation: "AZ"
		},
		{
		  name: "Arkansas",
		  abbreviation: "AR"
		},
		{
		  name: "California",
		  abbreviation: "CA"
		},
		{
		  name: "Colorado",
		  abbreviation: "CO"
		},
		{
		  name: "Connecticut",
		  abbreviation: "CT"
		},
		{
		  name: "Delaware",
		  abbreviation: "DE"
		},
		{
		  name: "District Of Columbia",
		  abbreviation: "DC"
		},
		{
		  name: "Florida",
		  abbreviation: "FL"
		},
		{
		  name: "Georgia",
		  abbreviation: "GA"
		},
		{
		  name: "Hawaii",
		  abbreviation: "HI"
		},
		{
		  name: "Idaho",
		  abbreviation: "ID"
		},
		{
		  name: "Illinois",
		  abbreviation: "IL"
		},
		{
		  name: "Indiana",
		  abbreviation: "IN"
		},
		{
		  name: "Iowa",
		  abbreviation: "IA"
		},
		{
		  name: "Kansas",
		  abbreviation: "KS"
		},
		{
		  name: "Kentucky",
		  abbreviation: "KY"
		},
		{
		  name: "Louisiana",
		  abbreviation: "LA"
		},
		{
		  name: "Maine",
		  abbreviation: "ME"
		},
		{
		  name: "Maryland",
		  abbreviation: "MD"
		},
		{
		  name: "Massachusetts",
		  abbreviation: "MA"
		},
		{
		  name: "Michigan",
		  abbreviation: "MI"
		},
		{
		  name: "Minnesota",
		  abbreviation: "MN"
		},
		{
		  name: "Mississippi",
		  abbreviation: "MS"
		},
		{
		  name: "Missouri",
		  abbreviation: "MO"
		},
		{
		  name: "Montana",
		  abbreviation: "MT"
		},
		{
		  name: "Nebraska",
		  abbreviation: "NE"
		},
		{
		  name: "Nevada",
		  abbreviation: "NV"
		},
		{
		  name: "New Hampshire",
		  abbreviation: "NH"
		},
		{
		  name: "New Jersey",
		  abbreviation: "NJ"
		},
		{
		  name: "New Mexico",
		  abbreviation: "NM"
		},
		{
		  name: "New York",
		  abbreviation: "NY"
		},
		{
		  name: "North Carolina",
		  abbreviation: "NC"
		},
		{
		  name: "North Dakota",
		  abbreviation: "ND"
		},
		{
		  name: "Ohio",
		  abbreviation: "OH"
		},
		{
		  name: "Oklahoma",
		  abbreviation: "OK"
		},
		{
		  name: "Oregon",
		  abbreviation: "OR"
		},
		{
		  name: "Pennsylvania",
		  abbreviation: "PA"
		},
		{
		  name: "Rhode Island",
		  abbreviation: "RI"
		},
		{
		  name: "South Carolina",
		  abbreviation: "SC"
		},
		{
		  name: "South Dakota",
		  abbreviation: "SD"
		},
		{
		  name: "Tennessee",
		  abbreviation: "TN"
		},
		{
		  name: "Texas",
		  abbreviation: "TX"
		},
		{
		  name: "Utah",
		  abbreviation: "UT"
		},
		{
		  name: "Vermont",
		  abbreviation: "VT"
		},
		{
		  name: "Virginia",
		  abbreviation: "VA"
		},
		{
		  name: "Washington",
		  abbreviation: "WA"
		},
		{
		  name: "West Virginia",
		  abbreviation: "WV"
		},
		{
		  name: "Wisconsin",
		  abbreviation: "WI"
		},
		{
		  name: "Wyoming",
		  abbreviation: "WY"
		}
	];

	const CityStates = {
			Select: [],
			Massachusetts: ["Boston"],
			Colorado: ["Denver", "Boulder"],
			California: ["Los Angeles", "San Francisco", "San Diego", "Fresno"]
		}

	const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const renderedStates = States.map(state => {
	    return <option key={state.abbreviation}>{state.abbreviation}</option>;
	  });
	const renderedHours = hours.map((hour, index) => {
	    return <option key={index}>{hour}</option>;
	  });
	const renderedStateDropdown = States.map((loc, index) => {
		return <option key={index}>{loc.name}</option>
	})

	const [addPlace, { loading, error }] = useMutation(ADD_PLACE);

	const initialState = {
	    businessName: "",
	    category: "",
	    website: "",
	    phone: "",
	    address: "",
	    address2: "",
	    city: "",
	    state: "Select",
	    locationId: 1234,
	    zip: "",
	    parking: [],
	    hours: {
	    	monday1: null,
	    	monday2: null,
	    	tuesday1: null,	    		    	
	    	tuesday2: null,
	    	wednesday1: null,
	    	wednesday2: null,
	    	thursday1: null,
	    	thursday2: null,
	    	friday1: null,
	    	friday2: null,
	    	saturday1: null,
	    	saturday2: null,
	    	sunday1: null,
	    	sunday2: null,
	    },
	    photos: "",
	    errorMessage: ""
	  };

	const [data, updateData] = useState(initialState);

    const renderedCityDropdown = CityStates[data.state].map((city, index) => {
		return <option key={index}>{city}</option>
	})

	// Finish the submit request
	const handleSubmit = (event) => {
		event.preventDefault()
		if (!data.businessName || !data.category || data.address) {
			let address = data.address + data.address2
			let monday = [data.hours.monday1, data.hours.monday2]
			let tuesday = [data.hours.tuesday1, data.hours.tuesday2]
			let wednesday = [data.hours.wednesday1, data.hours.wednesday2]
			let thursday = [data.hours.thursday1, data.hours.thursday2]
			let friday = [data.hours.friday1, data.hours.friday2]
			let saturday = [data.hours.saturday1, data.hours.saturday2]
			let sunday = [data.hours.sunday1, data.hours.sunday2]
			let {businessName, category, website, phone, city, state, locationId, zip, parking } = data
			addPlace({
	      		 variables: {
	        		businessName,
	        		category,
	        		website, 
	        		phone,
	        		address,
	        		city,
	        		state,
	        		locationId,
	        		zip,
	        		parking,
	        		monday,
	        		tuesday,
	        		wednesday,
	        		thursday,
	        		friday,
	        		saturday,
	        		sunday
	      		},
		    });
		    updateData({
				...data,
				errorMessage: ""
			})
		} else {
			updateData({
				...data,
				errorMessage: "Please fill out all required fields"
			})
		}

	}

	const handleChange = (e) => {
		updateData({
			...data,
			[e.target.name]: e.target.value
		})
	}

	const handleParking = (e) => {
		const parkingArr = data.parking
		const index = parkingArr.indexOf(e.target.name)
		index < 0 ? parkingArr.unshift(e.target.name) : parkingArr.splice(index, 1)
		updateData({
			...data,
			parking: parkingArr
		})
	}

	const handleHours = (e) => {
		updateData({
			...data,
			hours: {
			...data.hours,
			[e.target.name]: e.target.value
			}
		})
	}

	return (
	    <div className="formContainer">
	    <div className="locationDropdowns">
	    	<select onChange={handleChange} name="state">
	    	<option>Select State</option>
	    	{renderedStateDropdown}
	    	</select>
	    	<select onChange={handleChange} name="city">
	    	<option>Select a City</option>
	    	{renderedCityDropdown}	    	
	    	</select>
	    </div>
	      <form id="addPlace" onSubmit={handleSubmit}>
	        <div className="top-form">
	          <label htmlFor="businessName">Business Name</label>
	          <input onChange={handleChange} className={data.errorMessage ? "error" : "businessName"} type="text" name="businessName" id="businessName" required />
	          <label htmlFor="category">Category</label>
	          <select onChange={handleChange} className={data.errorMessage ? "error" : "category"} name="category" id="category" form="addPlace" required>
	            <option disabled selected hidden>
	              Please select a category
	            </option>
	            <option>Restaurants</option>
	            <option>Coffee Shops</option>
	            <option>Bars & Nightlife</option>
	            <option>People</option>
	          </select>
	          <label htmlFor="website">Website</label>
	          <input onChange={handleChange} type="text" name="website" id="website" />
	          <label htmlFor="phone">Phone</label>
	          <input onChange={handleChange} type="text" name="phone" id="phone" />
	        </div>
	        <div className="middle-form">
	          <label htmlFor="address">Address</label>
	          <input onChange={handleChange} className={data.errorMessage ? "error" : "address"} type="text" name="address" id="address" required />
	          <input onChange={handleChange} type="text" name="address2" id="address" />
	          <label htmlFor="zip">Zipcode</label>
	          <input onChange={handleChange} type="text" name="zip" id="zip" />
	          <legend>Parking</legend>
	          <input onChange={handleParking} type="checkbox" name="Lot" id="Check1" />
	          <label htmlFor="Check1" check>
	            Lot
	          </label>
	          <input onChange={handleParking} type="checkbox" name="Street" id="Check2" />
	          <label htmlFor="Check2" check>
	            Street
	          </label>
	          <input onChange={handleParking} type="checkbox" name="Valet" id="Check3" />
	          <label htmlFor="Check3" check>
	            Valet
	          </label>
	          <input onChange={handleParking} type="checkbox" name="Limited Parking" id="Check4" />
	          <label htmlFor="Check4" check>
	            Limited Parking
	          </label>
	          <label htmlFor="monday">Monday</label>
	          <select onChange={handleHours} name="monday1" id="monday" form="addPlace">
	            <option disabled selected hidden />
	            {renderedHours}
	          </select>
	          <select onChange={handleHours} name="monday2" id="monday" form="addPlace">
	            <option disabled selected hidden />
	            {renderedHours}
	          </select>
	          <label htmlFor="tuesday">Tuesday</label>
	          <select onChange={handleHours} name="tuesday1" id="tuesday" form="addPlace">
	            <option disabled selected hidden />
	            {renderedHours}
	          </select>
	          <select onChange={handleHours} name="tuesday2" id="tuesday" form="addPlace">
	            <option disabled selected hidden />
	            {renderedHours}
	          </select>
	          <label htmlFor="wednesday">Wednesday</label>
	          <select onChange={handleHours} name="wednesday1" id="wednesday" form="addPlace">
	            <option disabled selected hidden />
	            {renderedHours}
	          </select>
	          <select onChange={handleHours} name="wednesday2" id="wednesday" form="addPlace">
	            <option disabled selected hidden />
	            {renderedHours}
	          </select>
	          <label htmlFor="thursday">Thursday</label>
	          <select onChange={handleHours} name="thursday1" id="thursday" form="addPlace">
	            <option disabled selected hidden />
	            {renderedHours}
	          </select>
	          <select onChange={handleHours} name="thursday2" id="thursday" form="addPlace">
	            <option disabled selected hidden />
	            {renderedHours}
	          </select>
	          <label htmlFor="friday">Friday</label>
	          <select onChange={handleHours} name="friday1" id="friday" form="addPlace">
	            <option disabled selected hidden />
	            {renderedHours}
	          </select>
	          <select onChange={handleHours}name="friday2" id="friday" form="addPlace">
	            <option disabled selected hidden />
	            {renderedHours}
	          </select>
	          <label htmlFor="saturday">Saturday</label>
	          <select onChange={handleHours} name="saturday1" id="saturday" form="addPlace">
	            <option disabled selected hidden />
	            {renderedHours}
	          </select>
	          <select onChange={handleHours} name="saturday2" id="saturday" form="addPlace">
	            <option disabled selected hidden />
	            {renderedHours}
	          </select>
	          <label htmlFor="sunday">Sunday</label>
	          <select onChange={handleHours} name="sunday1" id="sunday" form="addPlace">
	            <option disabled selected hidden />
	            {renderedHours}
	          </select>
	          <select onChange={handleHours} name="sunday2" id="sunday" form="addPlace">
	            <option disabled selected hidden />
	            {renderedHours}
	          </select>
	        </div>
	        <div className="bottom-form">
	          <label htmlFor="exampleFile">Pictures</label>
	          <input onChange={handleChange} type="file" name="file" id="exampleFile" />
	          <button type="submit">Submit</button>
	        </div>
	      </form>
	    </div>
	);
};

export default AddPlaceForm;