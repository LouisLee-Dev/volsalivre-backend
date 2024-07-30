const express = require("express");
const router = express.Router();
const Tipos = require("../../models/Tipo");
const validateSeriesInput = require("../../validation/tipo.js");

router.post("/add", async (req, res) => {
  const { errors, isValid } = validateSeriesInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const existingTipo = await Tipos.findOne({ tipo: req.body.tipo });

    if (existingTipo) {
      errors.tipo = "Tipo already exists";
      return res.status(400).json(errors);
    }

    const newTipo = new Tipos({
      tipo: req.body.tipo,
    });

    const savedTipo = await newTipo.save();
    res.json(savedTipo);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const tipos = await Tipos.find();
    res.status(200).json(tipos);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
