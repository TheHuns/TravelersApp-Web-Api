const express = require("express");
const graphql = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// allow cross origin requests
app.use(cors());

mongoose.connect("mongodb://mongo:27017/graphqldb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(
  "/graphql",
  graphql({
    schema,
    graphiql: true
  })
);

app.listen(5000, () => {
  console.log("api running on port 5000/graphql");
});
