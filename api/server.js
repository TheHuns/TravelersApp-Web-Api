const express = require("express");
const graphql = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");

const app = express();

// allow cross origin requests
app.use(cors());

const db = config.get("mongoURI");

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

app.use(
  "/graphql",
  graphql({
    schema,
    graphiql: true
  })
);

app.listen(5000, () => {
  console.log("api running at http://localhost:5000/graphql");
});
