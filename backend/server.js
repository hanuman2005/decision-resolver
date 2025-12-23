require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { connectDB, closeDB } = require("./config/db");
const logger = require("./utils/logger");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Import routes
const authRoutes = require("./routes/authRoutes");
const groupRoutes = require("./routes/groupRoutes");
const decisionRoutes = require("./routes/decisionRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const inviteRoutes = require("./routes/inviteRoutes");
const chatRoutes = require("./routes/chatRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const aiRoutes = require("./routes/aiRoutes");

/**
 * Initialize Express App
 */
const app = express();

/**
 * Connect to Database
 */
connectDB();

/**
 * Middleware
 */

// Security headers
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  process.env.FRONTEND_DEV_PORTS?.split(",").map(
    (p) => `http://localhost:${p.trim()}`
  ) || [
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:3000",
  ],
]
  .flat()
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// HTTP request logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan("combined", {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  );
}

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", limiter);

/**
 * Routes
 */

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/decisions", decisionRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/invites", inviteRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/ai", aiRoutes);

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Group Decision Resolver API",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      groups: "/api/groups",
      decisions: "/api/decisions",
      health: "/health",
    },
    documentation: "See README.md for API documentation",
  });
});

/**
 * Error Handling
 */
app.use(notFound);
app.use(errorHandler);

/**
 * Start Server
 */
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
  logger.info(`📍 API available at http://localhost:${PORT}`);
  logger.info(`🏥 Health check at http://localhost:${PORT}/health`);
});

/**
 * Graceful Shutdown
 */
process.on("SIGTERM", async () => {
  logger.info("SIGTERM signal received: closing HTTP server");

  server.close(async () => {
    logger.info("HTTP server closed");

    // Close database connection
    await closeDB();

    process.exit(0);
  });
});

process.on("SIGINT", async () => {
  logger.info("SIGINT signal received: closing HTTP server");

  server.close(async () => {
    logger.info("HTTP server closed");

    // Close database connection
    await closeDB();

    process.exit(0);
  });
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Promise Rejection:", err);

  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;
