const mongoose = require("mongoose");

const dbConnectionUrl =
  process.env.MONGODB_CONNECTION_URL || "mongodb://localhost/elegant-store";

mongoose
  .connect(dbConnectionUrl)
  .then((res) => {
    console.log("connected to db.");
  })
  .catch((e) => console.log(e));
