const express = require("express");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

// Initialize Stripe with error handling
let stripe;
try {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn("[Payment] STRIPE_SECRET_KEY not configured");
  } else {
    stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  }
} catch (error) {
  console.error("[Payment] Stripe initialization failed:", error.message);
}

router.post(
  "/process",
  catchAsyncError(async (req, res, next) => {
    try {
      if (!stripe) {
        return next(new ErrorHandler("Stripe is not configured. Please add STRIPE_SECRET_KEY.", 500));
      }

      if (!req.body.amount) {
        return next(new ErrorHandler("Amount is required", 400));
      }

      console.log("[Payment] Creating payment intent for amount:", req.body.amount);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(req.body.amount),
        currency: "usd",
        metadata: {
          company: "Eshop-MV",
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      console.log("[Payment] Payment intent created:", paymentIntent.id);

      res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error("[Payment] Error creating payment intent:", error.message);
      return next(new ErrorHandler(error.message || "Payment processing failed", 500));
    }
  })
);

router.get(
  "/stripe-api-key",
  catchAsyncError(async (req, res, next) => {
    try {
      if (!process.env.STRIPE_API_KEY) {
        return next(new ErrorHandler("Stripe publishable key not configured", 500));
      }
      res.status(200).json({ stripeapikey: process.env.STRIPE_API_KEY });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
