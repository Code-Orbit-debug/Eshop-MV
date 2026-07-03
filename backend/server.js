const app = require("./app");
const dbConnection = require("./db/Database");
const cloudinary = require("cloudinary");

process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("Shutting Down Server (uncaughtException)");
});

// load env
require("dotenv").config();

// DB
dbConnection();

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (error) => {
  console.log(`Error: ${error.message}`);
  server.close(() => {
    process.exit(1);
  });
});