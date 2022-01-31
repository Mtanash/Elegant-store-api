require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
require("./config/DB");

const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

app.listen(port, () => console.log(`server is running on port ${port}`));
