import React, {useState, useContext} from "react";
import "./sass/main.scss";
import LandingPage from "./components/LandingPage";
import AddPlaceForm from "./components/AddPlace";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';

// Apollo Client Setup
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: 'http://localhost:5000/graphql',
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
});

function App() {

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
