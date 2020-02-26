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

// Import MongoDB Schema
const Location = require("./models/location");
const Venue = require("./models/venue");
const Hours = require("./models/hours");

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
    website: String
    phone: String
    address: String!
    locationId: ID!
    location: Location
    state: String
    zip: Int
    hours: Hours
    parking: String
  }

  type Hours {
    _id: ID
    businessId: ID
    monday: [Int]
    tuesday: [Int]
    wednesday: [Int]
    thursday: [Int]
    friday: [Int]
    saturday: [Int]
    sunday: [Int]
  }

  input LocationInfo {
    name: String!
    state: String!
  }

  input VenueInfo {
    businessName: String!
    category: String!
    website: String
    phone: String
    address: String!
    locationId: ID!
    state: String
    zip: Int
    parking: String
  }

  input HoursInfo {
    monday: [Int]
    tuesday: [Int]
    wednesday: [Int]
    thursday: [Int]
    friday: [Int]
    saturday: [Int]
    sunday: [Int]
  }

  type Mutation {
    addLocation(locationInfo: LocationInfo!): Location
    addVenue(venueInfo: VenueInfo!, hoursInfo: HoursInfo): Venue
  }
`;

// Resolvers determine what happen when a query or mutaion is called
const resolvers = {
  // For items with nested data fields...
  // This will pull related data based on the parent with each query
  Venue: {
    hours: async venue => {
      let hoursData = await Hours.findOne({ businessId: venue.id });
      return hoursData;
    },
    location: async venue => {
      let locationData = await Location.findById(venue.locationId);
      return locationData;
    }
  },
  Location: {
    venues: async location => {
      return Venue.find({ locationId: location.id });
    }
  },

  // The GET routes for this api
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

  // Similair to POST routes
  // here we will create/update/delete
  Mutation: {
    addLocation: (parent, { locationInfo }) => {
      return Location(locationInfo).save();
    },
    addVenue: async (parent, { venueInfo, hoursInfo }) => {
      let newVenue = await Venue(venueInfo).save();
      const {
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
      } = hoursInfo;
      const setHours = new Hours({
        businessId: newVenue._id,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
      });
      Hours(setHours).save();
      return Venue.findById(newVenue._id);
    }
  }
};

// Final server setup
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen({ port: 5000 }, () =>
  console.log(`Server ready at http://localhost:5000${server.graphqlPath}`)
);
