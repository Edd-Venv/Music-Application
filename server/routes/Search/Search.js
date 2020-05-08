const express = require("express");
const searchController = require("../../controllers/MusicControllers/Search/Search.js");

const router = express.Router();

router.post("/search", searchController.search);

module.exports = router;
