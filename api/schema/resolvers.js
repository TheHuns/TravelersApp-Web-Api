const config = require("config");

const jwt = require("jsonwebtoken");
const jwtSecret = config.get("jwtSecret");
// Import MongoDB Schema
const Location = require("../models/location");
const Venue = require("../models/venue");
const Hours = require("../models/hours");
const User = require("../models/user");

function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      userSub: user.userSub,
      name: user.name
    },
    jwtSecret,
    { expiresIn: "7d" }
  );
}

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

  // Similair to GET
  // The "read" routes for this api
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
  // here we will "create/update/delete"
  Mutation: {
    async login(_, { userInfo: { userSub, name } }) {
      let user;
      const findUser = await User.findOne({ userSub });
      if (findUser) {
        user = findUser;
      }

      if (!findUser) {
        userData = {
          name,
          userSub
        };
        return (user = User(userData).save());
      }

      const token = generateToken(user);

      return {
        name,
        userSub,
        _id: user._id,
        token
      };
    },
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

module.exports = resolvers;
