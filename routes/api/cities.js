const express = require("express");
const router = express.Router();
const Cities = require("../../models/Cities");
const validateSeriesInput = require("../../validation/cities");

router.post("/add", async (req, res) => {
  const { errors, isValid } = validateSeriesInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const existingcity = await Cities.findOne({ city: req.body.city });

    if (existingcity) {
      errors.city = "city already exists";
      return res.status(400).json(errors);
    }

    const newCity = new Cities({
      city: req.body.city,
    });

    const savedcity = await newCity.save();
    res.json(savedcity);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const cities = await Cities.find();
    res.status(200).json(cities);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
