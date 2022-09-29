const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/product.route");
const orderRouter = require("./routes/order.route");
const dashboardRouter = require("./routes/dashboard.route");
const corsOption = require("./config/cors.config");
const connectDB = require("./db/connect");
const path = require("path");
const errorMiddleware = require("./middleware/error.middleware");
const helmet = require("helmet");
const morgan = require("morgan");
const limiter = require("./config/limiter.config");

// app config
const app = express();
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(limiter);
app.use(helmet());
app.use(morgan("common"));
app.use(cors(corsOption));

// routes
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/dashboard", dashboardRouter);

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// error middleware
app.use(errorMiddleware);

// handle undefined paths
app.use((_req, res) => {
  res.status(404).json({
    message:
      "Ohh you are lost, read the API documentation to find your way back home 😂",
  });
});

connectDB(process.env.MONGODB_CONNECTION_URL);

module.exports = app;
