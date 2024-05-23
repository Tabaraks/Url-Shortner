const shortid = require("shortid");
const URL = require("../models/url");
const { request } = require("express");

const handleGenerateNewShortUrl = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  const shortId = shortid(8);
  await URL.create({
    short_id: shortId,
    redirect_url: body.url,
    visited_history: [],
    created_by: req.user._id,
  });
  return res.render("home", {
    id: shortId,
  });
  return res.json({ id: shortId });
};

const handleAnalytics = async (req, res) => {
  const short_id = req.params.short_id;
  const result = await URL.findOne({ short_id });
  return res.json({
    totalClicks: result.visit_history.length,
    visit_history: result.visit_history,
  });
};

module.exports = { handleGenerateNewShortUrl, handleAnalytics };
