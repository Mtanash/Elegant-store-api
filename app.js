const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const dashboardRouter = require("./routes/dashboard");
const corsOption = require("./config/corsOption");
const connectDB = require("./db/connect");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use(cors(corsOption));

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/dashboard", dashboardRouter);

connectDB(process.env.MONGODB_CONNECTION_URL);

module.exports = app;
