const express = require("express");
const router = express.Router();
const Turnos = require("../../models/Turno");
const validateSeriesInput = require("../../validation/turno.js");

router.post("/add", async (req, res) => {
  const { errors, isValid } = validateSeriesInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const existingTurno = await Turnos.findOne({ turno: req.body.turno });

    if (existingTurno) {
      errors.turno = "Turno already exists";
      return res.status(400).json(errors);
    }

    const newTurno = new Turnos({
      turno: req.body.turno,
    });

    const savedTurno = await newTurno.save();
    res.json(savedTurno);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const turnos = await Turnos.find();
    res.status(200).json(turnos);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
