const path = require("path");

// Load env before any module reads process.env
require("dotenv").config({ path: path.join(__dirname, "config/.env") });

const app = require("./app");
const dbConnection = require("./db/Database");
const cloudinary = require("cloudinary").v2;

process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("Shutting Down Server (uncaughtException)");
});

dbConnection();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT} (${process.env.NODE_ENV || "development"})`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || "not set"}`);
  console.log(
    `Email provider: ${process.env.RESEND_API_KEY ? "Resend (HTTPS)" : "SMTP"}`
  );
});

process.on("unhandledRejection", (error) => {
  console.log(`Error: ${error.message}`);
  server.close(() => {
    process.exit(1);
  });
});
