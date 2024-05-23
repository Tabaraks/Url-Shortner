const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleAnalytics,
} = require("../controller/url");

const router = express.Router();

router.post("/", handleGenerateNewShortUrl);

router.get("/analytics/:short_id", handleAnalytics);

module.exports = router;
