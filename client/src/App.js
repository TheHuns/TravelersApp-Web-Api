import React, {useState} from "react";
import "./sass/main.scss";
import LandingPage from "./components/LandingPage";
import AddPlaceForm from "./components/AddPlace"

function App() {

	const [test, changeTest] = useState(true) 

  return (
    	<div className="App">
      	{test ? <AddPlaceForm/> : <LandingPage />}
    	</div>
  );
}

export default App;
