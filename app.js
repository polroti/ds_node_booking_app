const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const ticketRoutes = require("./api/routes/tickets");
const bookingRoutes = require("./api/routes/bookings");
const discountRoutes = require("./api/routes/discount");
const userRoutes = require("./api/routes/users");

//db connection
mongoose
  .connect(
    "mongodb+srv://polroti:polroti123@sis-cluster-to2kk.azure.mongodb.net/train-app-auth",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((dbStatus) => {
    console.log("Connected to MongoDB Cloud");
  })
  .catch((err) => {
    console.log("Connection to MongoDB Cloud Failed");
  });

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//handling cors errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//adding routes
app.use("/", (req, res) => {
  res.send("Welcome to my server");
});
app.use("/tickets", ticketRoutes);
app.use("/bookings", bookingRoutes);
app.use("/discounts", discountRoutes);
app.use("/users", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  //    error.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
