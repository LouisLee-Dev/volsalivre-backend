const express = require("express");
const router = express.Router();
const Role = require("../../models/Role");
const validateRoleInput = require("../../validation/role");

router.post("/add", async (req, res) => {
  const { errors, isValid } = validateRoleInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const existingrole = await Role.findOne({ role: req.body.role });

    if (existingrole) {
      errors.role = "role already exists";
      return res.status(400).json(errors);
    }

    const newRole = new Role({
      role: req.body.role,
    });

    const savedRole = await newRole.save();
    res.json(savedRole);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
