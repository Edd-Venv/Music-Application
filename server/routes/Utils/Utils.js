/* eslint-disable camelcase */
const express = require("express");
const musicUtilsController = require("../../controllers/MusicControllers/Utils/Utils.js");

const router = express.Router();

//router.post("/search/saveSong", musicUtilsController.saveSong);

router.post("/song", musicUtilsController.saveSong);

///FETCHING SAVED SONGS
router.get("/MySongs", musicUtilsController.getMySongs);

//DELETING SAVED SONGS
router.delete("/song", musicUtilsController.deleteSong);

/// SENDING SELETED BUTTON KEY
router.post("/buttonUI", musicUtilsController.handleButtonUI);

module.exports = router;
