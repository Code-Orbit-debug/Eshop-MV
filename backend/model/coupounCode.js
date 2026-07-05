const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your CopunCode  Name!"],
    unique: true,
  },
  value: {
    type: Number,
    required: [true, "Please Enter Your CopunCode Value!"],
  },
  minAmount: {
    type: Number,
  },
  maxAmount: {
    type: Number,
  },
  shop: {
    type: Object,
    required: true,
  },
  selectedProducts: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const CouponCode = mongoose.model("CouponCode", couponCodeSchema);

module.exports = CouponCode;
