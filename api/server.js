const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const app = express();
const { gql } = require("apollo-server-express");

// Mongoose setup to connect to DB
const db = config.get("mongoURI");

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

const Location = require("./models/location");
const Venue = require("./models/venue");

// GraphQl type definitions(similair to models for db)
const typeDefs = gql`
  type Query {
    getLocation(id: ID): Location!
    getLocations: [Location]
    getVenue(id: ID): Venue
    getVenues: [Venue]
  }

  type Location {
    name: String!
    state: String!
    id: ID!
    venues: [Venue]
  }

  type Venue {
    id: ID!
    businessName: String!
    category: String!
    website: String!
    phone: String!
    address: String!
    locationId: ID!
    location: Location
    state: String!
    zip: Int
    hours: Hours
    parking: String
  }

  type Hours {
    monday: [Int]
    tuesday: [Int]
    wednesday: [Int]
    thurday: [Int]
    friday: [Int]
    saturday: [Int]
    sunday: [Int]
  }

  input LocationInfo {
    name: String!
    state: String!
  }

  type Mutation {
    addLocation(locationInfo: LocationInfo!): Location
  }
`;

// Resolvers determine what happen when a query or mutaion is called
const resolvers = {
  Query: {
    getLocation: (parent, { id }) => {
      return Location.findById({ _id: id });
    },
    getLocations: () => {
      return Location.find({});
    },
    getVenue: (parent, { id }) => {
      return Venue.findById({ _id: id });
    },
    getVenues: () => {
      return Venue.find({});
    }
  },
  Mutation: {
    addLocation: (parent, { locationInfo }) => {
      return Location(locationInfo).save();
    }
  }
};

// Final server setup
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen({ port: 5000 }, () =>
  console.log(`Server ready at http://localhost:5000${server.graphqlPath}`)
);
