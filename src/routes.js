const express = require("express");
const twitterRoute = require("./routes/twitterRoute");
const router = express.Router();

router.use("/twitter", twitterRoute);

module.exports = router;
