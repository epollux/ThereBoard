const express = require("express");
const morgan = require("morgan");

const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");

const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

// Connect database
connectDB();

// Route files
const users = require("./routes/users");
const index = require("./routes/index");
const boards = require("./routes/boards");
const devices = require("./routes/devices");
const services = require("./routes/services");
const auth = require("./routes/auth");

// Express
const app = express();

// Body parser
app.use(express.json());

// Security and Ops packages
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(cors());

// Rate limit
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // 100 request per 10 minutes
});
app.use(limiter);

app.use(hpp());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log("Development environment");
}

// Mount routers
app.use("/api/v1/", index);
app.use("/api/v1/users", users);
app.use("/api/v1/boards", boards);
app.use("/api/v1/devices", devices);
app.use("/api/v1/services", services);
app.use("/api/v1/auth", auth);

// Dev Logging middleware
app.use(errorHandler);

const server = app.listen(
  process.env.PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
