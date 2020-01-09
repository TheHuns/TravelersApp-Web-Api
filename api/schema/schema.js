const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} = graphql;

const locations = [
  { name: "Durango", state: "Colorado", id: 1 },
  { name: "Bayfield", state: "Colorado", id: 2 },
  { name: "Silverton", state: "Colorado", id: 3 }
];

const venues = [
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

const LocationType = new GraphQLObjectType({
  name: "Location",
  fields: () => ({
    name: { type: GraphQLString },
    state: { type: GraphQLString },
    id: { type: GraphQLID },
    venues: {
      type: new GraphQLList(VenueType),
      resolve(parent, args) {
        // Get venues located within a certain location
        return _.filter(venues, { locationId: parent.id });
      }
    }
  })
});

const VenueType = new GraphQLObjectType({
  name: "Venue",
  fields: () => ({
    id: { type: GraphQLID },
    businessName: { type: GraphQLString },
    category: { type: GraphQLString },
    website: { type: GraphQLString },
    phone: { type: GraphQLString },
    address: { type: GraphQLString },
    locationId: { type: GraphQLID },
    location: {
      type: LocationType,
      resolve(parent, args) {
        // find location by id
        return _.find(locations, { id: parent.locationId });
      }
    },
    state: { type: GraphQLString },
    zip: { type: GraphQLInt }
    // hours: {
    //   type: HoursType,
    //   resolve(parent, args) {
    //     // return hours for the parent business
    //     return _.find(hours, { businessId: parent.id });
    //   }
    // }
  })
});

const HoursType = new GraphQLObjectType({
  name: "Hours",
  fields: () => ({
    businessId: { type: GraphQLID },
    monday: { type: [GraphQLInt] },
    tuesday: { type: [GraphQLInt] },
    wednesday: { type: [GraphQLInt] },
    thurday: { type: [GraphQLInt] },
    friday: { type: [GraphQLInt] },
    saturday: { type: [GraphQLInt] },
    sunday: { type: [GraphQLInt] }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Returns a Single location and all of its associated venues if requested
    location: {
      type: LocationType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(locations, { id: args.id });
      }
    },
    // Returns All locations
    // will edit this later to return a short list of locations based on user location or input
    locations: {
      type: new GraphQLList(LocationType),
      resolve(parent, args) {
        // code to get data from db
        return locations;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
