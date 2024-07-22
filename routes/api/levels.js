const express = require("express");
const router = express.Router();
const Levels = require("../../models/Levels");
const validateSeriesInput = require("../../validation/level");

router.post("/add", async (req, res) => {
  const { errors, isValid } = validateSeriesInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const existingLevel = await Levels.findOne({ level: req.body.level });

    if (existingLevel) {
      errors.level = "Level already exists";
      return res.status(400).json(errors);
    }

    const newLevel = new Levels({
      level: req.body.level,
    });

    const savedLevel = await newLevel.save();
    res.json(savedLevel);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const levels = await Levels.find();
    res.status(200).json(levels);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
