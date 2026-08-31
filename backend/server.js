const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const crypto = require("crypto");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// =========================
// RAZORPAY
// =========================

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "FitForge backend is running",
  });
});

// =========================
// CREATE PAYMENT ORDER
// =========================

app.post("/api/payment/create-order", async (req, res) => {
  try {
    const { amount, plan } = req.body;

    if (!amount || !plan) {
      return res.status(400).json({
        success: false,
        message: "Amount and plan are required",
      });
    }

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `fitforge_${Date.now()}`,
      notes: {
        plan,
      },
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Order creation error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create payment order",
    });
  }
});

// =========================
// VERIFY PAYMENT
// =========================

app.post("/api/payment/verify", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    res.json({
      success: true,
      message: "Payment verified successfully",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error) {
    console.error("Verification error:", error);

    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
});

// =========================
// START SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`FitForge backend running on port ${PORT}`);
});
