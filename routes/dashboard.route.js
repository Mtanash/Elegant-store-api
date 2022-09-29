const express = require("express");
const { getDashboardData } = require("../controllers/dashboard.controller");

const dashboardRouter = express.Router();

dashboardRouter.get("/", getDashboardData);

module.exports = dashboardRouter;
