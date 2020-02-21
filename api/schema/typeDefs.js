const { gql } = require("apollo-server-express");

// GraphQl type definitions(similair to models for db)
const typeDefs = gql`
  type Query {
    getLocation(id: ID): Location!
    getLocations: [Location]
    getVenue(id: ID): Venue
    getVenues: [Venue]
  }

  type User {
    name: String
    _id: ID
    favorites: [ID]
    userSub: String!
    token: String
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
    website: String!
    phone: String!
    address: String!
    locationId: ID!
    state: String!
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

  input UserInfo {
    name: String
    userSub: String
  }

  type Mutation {
    addLocation(locationInfo: LocationInfo!): Location
    addVenue(venueInfo: VenueInfo!, hoursInfo: HoursInfo): Venue
    login(userInfo: UserInfo!): User
  }
`;

module.exports = typeDefs;
