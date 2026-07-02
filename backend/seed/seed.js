const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../config/.env"),
});

const Product = require("../model/product");
const Event = require("../model/event");

const products = require("./data");
const events = require("./eventData");

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    console.log("MongoDB Connected");

    await Product.deleteMany();
    await Event.deleteMany();

    await Product.insertMany(products);
    await Event.insertMany(events);

    console.log("Products Seeded Successfully");
    console.log("Events Seeded Successfully");

    process.exit();
  })
  .catch((err) => {
    console.log(err);
  });