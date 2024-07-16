const express = require("express");

const router = express.Router();

const Levels = require("../../models/Levels");
const validateLevelInput = require("../../validation/level");

router.post("/add", (req, res) => {
  const { errors, isValid } = validateLevelInput(req.body);
  // Check validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  Levels.findOne({ level: req.body.level }).then((level) => {
    if (level) {
      errors.level = "Level is exists";
      return res.status(400).json(errors);
    }

    {
      const newLevel = new Levels({
        level: req.body.level,
      });
      newLevel.save().then((level) => res.json(level));
    }
  });
});

router.get("/all", (req, res) => {
  Levels.find().then((level) => {
    res.status(200).json(level);
  });
});

module.exports = router;
