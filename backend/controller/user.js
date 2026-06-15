const express = require("express");
const path = require("path");

const User = require("../model/user");
const router = express.Router();

const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");

// Create User
router.post(
  "/create-user",
  upload.single("file"),
  async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const userEmail = await User.findOne({ email });

      if (userEmail) {
        return next(new ErrorHandler("User already exists", 400));
      }

      if (!req.file) {
        return next(new ErrorHandler("Avatar is required", 400));
      }

      const filename = req.file.filename;

      // Example: uploads/avatar.jpg
      const fileUrl = path.join("uploads", filename);

      const createdUser = await User.create({
        name,
        email,
        password,
        avatar: fileUrl,
      });

      res.status(201).json({
        success: true,
        user: createdUser,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

module.exports = router;