const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_Ri4Y66ALtKZCcF",
  key_secret: "S8zsdBXjHdS9DIfo3gl1hUnN",
});

router.post("/create-order", async (req, res) => {
  const { amount, currency = "INR", receipt } = req.body;
  try {
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt,
    };
    const order = await razorpay.orders.create(options);
    console.log("Razorpay Order Created:", order);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;