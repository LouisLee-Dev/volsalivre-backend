const express = require("express");
const router = express.Router();

const Series = require("../../models/Series");
const validateLevelInput = require("../../validation/series");

// Add a new series
router.post("/add", async (req, res) => {
  const { errors, isValid } = validateLevelInput(req.body);
  // Check validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  try {
    const existingSeries = await Series.findOne({ series: req.body.series });
    if (existingSeries) {
      errors.series = "Series already exists";
      return res.status(400).json(errors);
    }

    const newSeries = new Series({
      level: req.body.level,
      series: req.body.series,
    });

    const savedSeries = await newSeries.save();
    res.status(201).json(savedSeries);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all series
router.get("/all", async (req, res) => {
  try {
    const series = await Series.find();
    res.status(200).json(series);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all series by level
router.get("/all/:level", async (req, res) => {
  try {
    const series = await Series.find({ level: req.params.level });
    res.status(200).json(series);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
