const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authMiddleware = require("./middleware/authMiddleware");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());

// =========================
// POSTGRESQL
// =========================

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .connect()
  .then((client) => {
    console.log("PostgreSQL connected");
    client.release();
  })
  .catch((error) => {
    console.error("PostgreSQL connection error:", error.message);
  });

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
// SIGN UP
// =========================

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // Clean user input
    const cleanName = name.trim();
    const cleanEmail = email.toLowerCase().trim();

    // Check if email already exists
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [cleanEmail],
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [cleanName, cleanEmail, hashedPassword],
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create account",
    });
  }
});

// =========================
// SIGN IN
// =========================

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Clean email
    const cleanEmail = email.toLowerCase().trim();

    // Find user
    const result = await pool.query(
      "SELECT id, name, email, password FROM users WHERE email = $1",
      [cleanEmail],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to login",
    });
  }
});

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE id = $1",
      [req.user.userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Auth user error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch user",
    });
  }
});

// =========================
// UPDATE PROFILE
// =========================

app.put("/api/auth/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const cleanName = name.trim();

    const result = await pool.query(
      `
      UPDATE users
      SET name = $1
      WHERE id = $2
      RETURNING id, name, email, created_at
      `,
      [cleanName, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Profile update error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update profile",
    });
  }
});
// =========================
// DASHBOARD STATS
// =========================

app.get("/api/dashboard/stats", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    // =========================
    // BASIC STATS
    // =========================

    const result = await pool.query(
      `
      SELECT
        COUNT(*)::int AS total_workouts,

        COALESCE(SUM(calories), 0)::int AS total_calories,

        COUNT(*) FILTER (
          WHERE completed_at >= DATE_TRUNC('month', CURRENT_DATE)
        )::int AS this_month

      FROM workout_progress
      WHERE user_id = $1
      `,
      [userId],
    );

    const stats = result.rows[0];

    // =========================
    // CURRENT STREAK
    // =========================

    const workoutDatesResult = await pool.query(
      `
      SELECT DISTINCT completed_at::date AS workout_date
      FROM workout_progress
      WHERE user_id = $1
        AND completed_at IS NOT NULL
      ORDER BY workout_date DESC
      `,
      [userId],
    );

    const workoutDates = workoutDatesResult.rows.map((row) => {
      return new Date(row.workout_date);
    });

    let currentStreak = 0;

    if (workoutDates.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const latestDate = new Date(workoutDates[0]);
      latestDate.setHours(0, 0, 0, 0);

      const differenceFromToday = (today - latestDate) / (1000 * 60 * 60 * 24);

      // Streak can continue if workout was today or yesterday
      if (differenceFromToday <= 1) {
        currentStreak = 1;

        for (let i = 1; i < workoutDates.length; i++) {
          const previousDate = new Date(workoutDates[i - 1]);
          const currentDate = new Date(workoutDates[i]);

          previousDate.setHours(0, 0, 0, 0);
          currentDate.setHours(0, 0, 0, 0);

          const difference =
            (previousDate - currentDate) / (1000 * 60 * 60 * 24);

          if (difference === 1) {
            currentStreak++;
          } else {
            break;
          }
        }
      }
    }

    // =========================
    // RESPONSE
    // =========================

    res.json({
      success: true,
      stats: {
        totalWorkouts: stats.total_workouts,
        totalCalories: stats.total_calories,
        currentStreak,
        thisMonth: stats.this_month,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch dashboard stats",
    });
  }
});

// =========================
// RECENT WORKOUTS
// =========================

app.get("/api/dashboard/recent-workouts", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT
        id,
        workout_name,
        duration,
        calories,
        completed_at
      FROM workout_progress
      WHERE user_id = $1
      ORDER BY completed_at DESC
      LIMIT 5
      `,
      [userId],
    );

    res.json({
      success: true,
      workouts: result.rows,
    });
  } catch (error) {
    console.error("Recent workouts error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch recent workouts",
    });
  }
});

// =========================
// WORKOUT HISTORY
// =========================

app.get("/api/workout-history", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT
        id,
        workout_name,
        duration,
        calories,
        completed_at
      FROM workout_progress
      WHERE user_id = $1
      ORDER BY completed_at DESC
      `,
      [userId],
    );

    res.json({
      success: true,
      workouts: result.rows,
    });
  } catch (error) {
    console.error("Workout history error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch workout history",
    });
  }
});

// =========================
// COMPLETE WORKOUT
// =========================

app.post("/api/workout-progress", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { workoutName, duration, calories } = req.body;

    // Validate required fields
    if (!workoutName || duration === undefined || calories === undefined) {
      return res.status(400).json({
        success: false,
        message: "Workout name, duration and calories are required",
      });
    }

    // Prevent accidental duplicate completion
    // for the same workout within 5 minutes
    const duplicateCheck = await pool.query(
      `
      SELECT
        id,
        user_id,
        workout_name,
        duration,
        calories,
        completed_at
      FROM workout_progress
      WHERE user_id = $1
        AND workout_name = $2
        AND duration = $3
        AND calories = $4
        AND completed_at::date = CURRENT_DATE
      ORDER BY completed_at DESC
      LIMIT 1
      `,
      [userId, workoutName, duration, calories],
    );

    if (duplicateCheck.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "This workout was already completed recently",
        workout: duplicateCheck.rows[0],
      });
    }

    const result = await pool.query(
      `
      INSERT INTO workout_progress
        (user_id, workout_name, duration, calories, completed_at)
      VALUES
        ($1, $2, $3, $4, CURRENT_TIMESTAMP)
      RETURNING
        id,
        user_id,
        workout_name,
        duration,
        calories,
        completed_at
      `,
      [userId, workoutName, duration, calories],
    );

    res.status(201).json({
      success: true,
      message: "Workout completed successfully",
      workout: result.rows[0],
    });
  } catch (error) {
    console.error("Workout progress error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to save workout progress",
    });
  }
});
// =========================
// CREATE PAYMENT ORDER
// =========================

app.post("/api/payment/create-order", async (req, res) => {
  try {
    const { amount, plan } = req.body;

    // Validate input
    if (amount === undefined || amount === null || !plan) {
      return res.status(400).json({
        success: false,
        message: "Amount and plan are required",
      });
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment amount",
      });
    }

    // Razorpay amount must be at least ₹1 = 100 paise
    if (numericAmount < 1) {
      return res.status(400).json({
        success: false,
        message: "Minimum payment amount is ₹1",
      });
    }

    // Make sure Razorpay credentials exist
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("Razorpay environment variables are missing");

      return res.status(500).json({
        success: false,
        message: "Razorpay configuration is missing",
      });
    }

    const options = {
      amount: Math.round(numericAmount * 100),
      currency: "INR",
      receipt: `fitforge_${Date.now()}`,
      notes: {
        plan: String(plan),
      },
    };

    console.log("Creating Razorpay order:", {
      amount: options.amount,
      currency: options.currency,
      plan: options.notes.plan,
    });

    const order = await razorpay.orders.create(options);

    console.log("Razorpay order created:", order.id);

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Order creation error:", {
      statusCode: error.statusCode,
      code: error.error?.code,
      description: error.error?.description,
      message: error.message,
    });

    if (error.statusCode === 401) {
      return res.status(401).json({
        success: false,
        message: "Razorpay authentication failed. Check Test API credentials.",
      });
    }

    return res.status(500).json({
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

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification details are missing",
      });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error("Razorpay secret key is missing");

      return res.status(500).json({
        success: false,
        message: "Razorpay configuration is missing",
      });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Check signature length before timingSafeEqual
    if (generatedSignature.length !== razorpay_signature.length) {
      console.error("Invalid Razorpay signature length");

      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const isValid = crypto.timingSafeEqual(
      Buffer.from(generatedSignature, "utf8"),
      Buffer.from(razorpay_signature, "utf8"),
    );

    if (!isValid) {
      console.error("Payment verification failed:", razorpay_payment_id);

      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    console.log("========================================");
    console.log("Payment verified successfully:", razorpay_payment_id);
    console.log("Order ID:", razorpay_order_id);
    console.log("========================================");

    return res.json({
      success: true,
      message: "Payment verified successfully",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error) {
    console.error("Verification error:", error);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
});
// =========================
// START SERVER
// =========================

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`FitForge backend running on port ${PORT}`);
});

server.on("error", (error) => {
  console.error("SERVER ERROR:", error);
});
