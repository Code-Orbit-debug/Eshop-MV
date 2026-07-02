const express = require("express");
const path = require("path");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const User = require("../model/user");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");
const { isAthuenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
//craete_user Route
router.post("/create-user", async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;

    if (!name || !email || !password || !avatar) {
      return next(new ErrorHandler("All fields are required", 400));
    }
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const myCloud = await cloudinary.uploader.upload(avatar, {
      folder: "avatars",
    });

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:3000/activation/${activationToken}`;
    try {
      await sendMail({
        email: user.email,
        subject: "Activate Your Account!",
        message: `Hello!\n Dear ${user.name}\n Please click on the link below to activate your account \n${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email:-${user.email} to activate your account!`,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
});
//create activation Token (Function)
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
//activate user Route
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUser) {
        next(new ErrorHandler("Invalid Token", 400));
      }
      const { name, email, password, avatar } = newUser;
      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }

      user = await User.create({
        name,
        email,
        password,
        avatar,
      });
      sendToken(user, 201, res);
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  })
);
//login_user Route
router.post(
  "/login-user",
  catchAsyncError(async (req, res, next) => {
    try {
      let { email, password } = req.body;
      if (!email || !password)
        return next(new ErrorHandler("All Fileds are required!", 500));
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User Does't Exist!", 400));
      }
      const ValidPassword = await user.comparePassword(password);
      if (!ValidPassword) {
        return next(
          new ErrorHandler("Please,Provide the correct information!", 400)
        );
      }
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//load User Route
router.get(
  "/get-user",
  isAthuenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return next(new ErrorHandler("User does'nt exist!", 400));
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// Logout User
router.get(
  "/logout",
  isAthuenticated,
  catchAsyncError(async (reeq, res, next) => {
    try {
      res.cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: "Logout Successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//update User InFo
router.put(
  "/update-user-info",
  isAthuenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const { name, email, password, phoneNumber } = req.body;
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler(error.message, 400));
      }

      const ValidPassword = await user.comparePassword(password);
      if (!ValidPassword) {
        return next(
          new ErrorHandler("Please,Provide the correct information!", 400)
        );
      }
      user.name = name;
      user.email = email;
      user.password = password;
      user.phoneNumber = phoneNumber;
      await user.save();
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update user Avatar
router.put(
  "/update-avatar",
  isAthuenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      let existsUser = await User.findById(req.user.id);
      if (req.body.avatar !== "") {
        const imageId = existsUser.avatar.public_id;

        await cloudinary.uploader.destroy(imageId);

        const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
        });
        existsUser.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      await existsUser.save();

      res.status(200).json({
        success: true,
        existsUser,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//update User Addresses
router.put(
  "/update-user-addresses",
  isAthuenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      const sameTypeAdress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAdress) {
        return next(
          new ErrorHandler(
            `${req.body.addressType} address is already exists`,
            400
          )
        );
      }
      const existAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );
      if (existAddress) {
        Object.assign(existAddress, req.body);
      } else {
        user.addresses.push(req.body);
      }
      await user.save();
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//delete user address
router.delete(
  `/delete-user-address/:id`,
  isAthuenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;
      //“Find a user by their ID , then (pull/remove) one address from their list of addresses.
      await User.updateOne(
        { _id: userId },
        { $pull: { addresses: { _id: addressId } } }
      );
      const user = await User.findById(userId);
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//update password
router.put(`/update-user-password`, isAthuenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    const comparePassword = await user.comparePassword(req.body.oldPassword);
    if (!comparePassword) {
      return next(new ErrorHandler("Wrong Password", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password dosn't match ", 400));
    }
    user.password = req.body.newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password Updated Successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//find user infromation with the userId
router.get(
  "/user-info/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//get all Users ----> (Admin)
router.get(
  "/admin-all-users",
  isAthuenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const users = await User.find().sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//DeleteUser ---admin
router.delete(
  "/admin-delete-user/:id",
  isAthuenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return next(
          new ErrorHandler(`User is not available with this ${id}!`, 400)
        );
      }
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "User Deleted Successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
