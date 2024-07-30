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
      levelId: req.body.levelId,
      series: req.body.series,
    });

    const savedSeries = await newSeries.save();
    res.status(201).json(savedSeries);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all series
router.get("/", async (req, res) => {
  const { levelId } = req.query; // Get level from query parameters
  try {
    let series;
    if (levelId) {
      // If level is provided, filter series by level
      series = await Series.find({ levelId: levelId })
        .populate("levelId", "level") // Populate level details; adjust as necessary
        .exec();
    } else {
      // If no level is provided, return all series
      series = await Series.find()
        .populate("levelId", "level") // Populate level details for all series
        .exec();
    }    
    res.status(200).json(series);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
