const express = require("express");
const router = express.Router();
const { getWHOTwitter } = require("../controllers/twitter");

router.get("/who", getWHOTwitter);

module.exports = router;
