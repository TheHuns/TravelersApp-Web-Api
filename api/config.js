const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const url = "mongodb://mongo:27017/graphqldb";

mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once("open", () =>
  console.log(`Connected to mongo at ${url}`)
);
