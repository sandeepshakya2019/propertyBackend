const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const propertyRoutes = require("./routes/property-route");
const HttpError = require("./models/http-error");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/api/property", propertyRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  console.log(error.message);
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect("mongodb://localhost:27017/property")
  .then(() => {
    console.log("Database Connected ...");
    app.listen(5000, () => {
      console.log("Server is Running ...");
    });
  })
  .catch((err) => {
    console.log(err);
  });
