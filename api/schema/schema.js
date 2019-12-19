const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const places = [
  { name: "Durango", state: "Colorado" },
  { name: "Bayfield", state: "Colorado" },
  { name: "Silverton", state: "Colorado" }
];

const PlaceType = new GraphQLObjectType({
  name: "Place",
  fields: () => ({
    name: { type: GraphQLString },
    state: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    places: {
      type: new GraphQLList(PlaceType),
      resolve(parent, args) {
        // code to get data from db
        return places;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
