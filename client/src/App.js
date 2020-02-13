import React, {useState} from "react";
import "./sass/main.scss";
import LandingPage from "./components/LandingPage";
import AddPlaceForm from "./components/AddPlace"
import ApolloClient from "apollo-boost";
import  {ApolloProvider} from "react-apollo";

function App() 

	const client = newApolloClient({
		uri: 'http://localhost:5000/graphql'
	})

	const [test, changeTest] = useState(true) 

  return (
  	<ApolloProvider client={client}>
    	<div className="App">
      	{test ? <AddPlaceForm/> : <LandingPage />}
    	</div>
    </ApolloProvider>
  );
}

export default App;
