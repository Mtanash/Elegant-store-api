const express = require("express");
const { getDashboardData } = require("../controllers/dashboard");

const dashboardRouter = express.Router();

dashboardRouter.get("/", getDashboardData);

module.exports = dashboardRouter;
