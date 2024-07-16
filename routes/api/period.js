const express = require("express");

const router = express.Router();
const Period = require("../../models/Shift");
const validatePeriodInput = require("../../validation/period");

router.get("/", (req, res) => {
  Period.find().then((period) => {
    if (!period.length) {
      return res.status(400).json({ msg: "period is not exists" });
    }
    res.status(200).json(period);
  });
});

router.post("/add", (req, res) => {
  const { errors, isValid } = validatePeriodInput(req.body);
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }
  Period.findOne({ period: req.body.period }).then((period) => {
    if (period) {
      errors.period = "Period is exists";
      res.status(400).json(errors);
    }
    {
      const newPeriod = new Period({
        period: req.body.period,
      });
      newPeriod.save().then((period) => res.json(period));
    }
  });
});

router.delete("/:id", (req, res) => {
    Period.findOne({period:req.params.id})
        .then(period => {
            period.remove().then(period => res.json(period));
        })
});
router.delete("/all", (req, res) => {
    Period.deleteMany({}).then((period) => {
      res.json(period);
    });
  });

module.exports = router;
