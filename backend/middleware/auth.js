const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");
exports.isAthuenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login to continue", 401));
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decode.id);
  next();
});
exports.isSeller = catchAsyncError(async (req, res, next) => {
  const { shop_token } = req.cookies;
  if (!shop_token) {
    return next(new ErrorHandler("Please Login to continue", 401));
  }
  const decode = jwt.verify(shop_token, process.env.JWT_SECRET_KEY);
  req.seller = await Shop.findById(decode.id);
  next();
});

exports.isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role} can not access this resources!`)
      );
    }
    next();
  };
};
