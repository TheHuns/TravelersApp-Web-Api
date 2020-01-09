const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const _ = require("lodash");
const config = require("config");
const mongoose = require("mongoose");
const app = express();

// Mongoose setup to connect to DB
const db = config.get("mongoURI");
const Location = require("../models/location");

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

// DUMMY DATA
const locationsList = [
  { name: "Durango", state: "Colorado", id: 1 },
  { name: "Bayfield", state: "Colorado", id: 2 },
  { name: "Silverton", state: "Colorado", id: 3 }
];

const venuesList = [
  {
    businessName: "Ska Brewing",
    address: "800 Turner Dr",
    website: "skabrewing.com",
    locationId: 1,
    id: 1
  },
  {
    businessName: "Bottom Shelf Brewing",
    address: "200 Mill Street",
    website: "bottomshelf.com",
    locationId: 2,
    id: 2
  },
  {
    businessName: "Avalanche Cafe",
    address: "400 Blair St",
    website: "avalanchecafe.com",
    locationId: 3,
    id: 3
  }
];

const hours = [
  {
    monday: [0800, 2000],
    tuesday: [0700, 1900],
    wednesday: [0700, 1900],
    thurday: [0700, 1900],
    friday: [0700, 1900],
    saturday: [0700, 1900],
    sunday: [0700, 1900],
    businessId: 1
  },
  {
    monday: [0800, 2000],
    tuesday: [0700, 2000],
    wednesday: [0700, 2200],
    thurday: [0700, 2200],
    friday: [0700, 2200],
    saturday: [0700, 2200],
    sunday: [0700, 2200],
    businessId: 2
  },
  {
    monday: [1100, 2000],
    tuesday: [1100, 1900],
    wednesday: [1100, 1900],
    thurday: [1100, 1900],
    friday: [1100, 1900],
    saturday: [1100, 1900],
    sunday: [1100, 1900],
    businessId: 3
  }
];

// GraphQl type definitions(similair to models for db)
const typeDefs = gql`
  type Query {
    location(id: ID): Location!
    locations: [Location]
    venue(id: ID): Venue
    venues: [Venue]
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
    location: (parent, { id }) => {
      return Location.findById({ _id: id });
    },
    locations: () => {
      return locationsList;
    },
    venue: (parent, { id }) => {
      return _.find(venuesList, { id: id });
    },
    venues: () => {
      return venuesList;
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
