const express = require("express");
const router = express.Router();
const Neighborhoods = require("../../models/Neighborhood");
const validateNeighborhoodInput = require("../../validation/neighborhood");

router.post("/add", async (req, res) => {
  const { errors, isValid } = validateNeighborhoodInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const existingcity = await Neighborhoods.findOne({ neigh: req.body.neigh });

    if (existingcity) {
      errors.city = "Neighborhood already exists";
      return res.status(400).json(errors);
    }

    const newCity = new Neighborhoods({
      cityId: req.body.cityId,
      neigh: req.body.neigh,
    });

    const savedcity = await newCity.save();
    res.json(savedcity);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/', async (req, res) => {  
  const { cityId } = req.query; // Get cityId from query parameters  

  try {  
      let neighborhoods;  
      
      if (cityId) {  
          // If cityId is provided, filter neighborhoods by cityId  
          neighborhoods = await Neighborhoods.find({ cityId: cityId })  
              .populate('cityId', 'city') // Populate city details; adjust as necessary  
              .exec();  
      } else {  
          // If no cityId is provided, return all neighborhoods  
          neighborhoods = await Neighborhoods.find()  
              .populate('cityId', 'city') // Populate city details for all neighborhoods  
              .exec();  
      }  

      res.status(200).json(neighborhoods); // Return the list of neighborhoods  
  } catch (err) {  
      console.error(err);  
      res.status(500).json({ error: "Server error" });  
  }  
});  

module.exports = router;
