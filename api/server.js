const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const app = express();

const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");

// Mongoose setup to connect to DB
const db = config.get("mongoURI");

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

// Final server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res })
});

server.applyMiddleware({ app });

app.listen({ port: 5000 }, () =>
  console.log(`Server ready at http://localhost:5000${server.graphqlPath}`)
);
