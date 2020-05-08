const express = require("express");
const apiController = require("../../controllers/MusicControllers/ApiCalls/ApiCalls.js");

const router = express.Router();

router.get("/ChartData", apiController.getChartData);

module.exports = router;
