const express = require('express');
const Shift = require('../../models/Shift');
const router = express.Router();

router.post('/add', (req, res) => {
  Shift.findOne({shift: req.body.shift})
    .then(shift => {
      if(shift) {
        return res.status(400).json({errors: "already exists!"});
      }
      const newShift = new Shift({
        shift: req.body.shift
      })
      newShift.save().then(shift => res.status(200).json(shift));
    })
})

module.exports = router;