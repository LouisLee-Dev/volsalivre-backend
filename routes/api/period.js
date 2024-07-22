const express = require("express");
const router = express.Router();
const Period = require("../../models/Shift");
const validatePeriodInput = require("../../validation/period");

router.get("/", async (req, res) => {
  try {
    const periods = await Period.find();
    if (!periods.length) {
      return res.status(400).json({ msg: "No periods found" });
    }
    res.status(200).json(periods);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/add", async (req, res) => {
  const { errors, isValid } = validatePeriodInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const existingPeriod = await Period.findOne({ period: req.body.period });
    if (existingPeriod) {
      errors.period = "Period already exists";
      return res.status(400).json(errors);
    }

    const newPeriod = new Period({
      period: req.body.period,
    });
    const savedPeriod = await newPeriod.save();
    res.json(savedPeriod);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const period = await Period.findById(req.params.id);
    if (!period) {
      return res.status(404).json({ msg: "Period not found" });
    }
    await period.remove();
    res.json({ msg: "Period deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/all", async (req, res) => {
  try {
    await Period.deleteMany({});
    res.json({ msg: "All periods deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
