require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const dashboardRouter = require("./routes/dashboard");
const corsOption = require("./config/corsOption");
const cookieParser = require("cookie-parser");
require("./config/DB");

const port = process.env.PORT || 5000;

const app = express();
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(cors(corsOption));

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/dashboard", dashboardRouter);

app.listen(port, () => console.log(`server is running on port ${port}`));
