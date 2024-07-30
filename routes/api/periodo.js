const express = require("express");
const router = express.Router();
const Periodos = require("../../models/Periodo");
const validatePeriodoInput = require("../../validation/periodo");

router.post("/add", async (req, res) => {
  const { errors, isValid } = validatePeriodoInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const existingPeriodo = await Periodos.findOne({ year: req.body.year });

    if (existingPeriodo) {
      errors.year = "Periodo already exists";
      return res.status(400).json(errors);
    }

    const newPeriodo = new Periodos({
      year: req.body.year,
    });

    const savedPeriodo = await newPeriodo.save();
    res.json(savedPeriodo);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const periodos = await Periodos.find();
    res.status(200).json(periodos);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
