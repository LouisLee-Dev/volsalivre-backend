const express = require("express");
const router = express.Router();

const validateSchoolRegisterInput = require("../../validation/schools");
const School = require("../../models/School");

//get all
router.get("/", (req, res) => {
  School.find().then((school) => res.status(200).json(school));
  // res.status(200).json({msg:"ok"});
});

//school add
router.post("/add", (req, res) => {
  const { errors, isValid } = validateSchoolRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  School.findOne({ title: req.body.title }).then((school) => {
    if (school) {
      errors.title = "School is exists";
      return res.status(400).json(errors);
    }
    const newSchool = new School({
      title: req.body.title,
      mark: req.body.mark,
      star: req.body.star,
      level: req.body.level,
      position: req.body.position,
      at: req.body.at,
      years: req.body.years,
      shift: req.body.shift,
      type: req.body.type,
    });
    newSchool.save().then((school) => res.json({ success: "successed" }));
  });
});

//school edit
router.post("/edit", (req, res) => {
  console.log(req.body);
  const schoolEdit = {};
  schoolEdit.title = req.body.title;
  schoolEdit.star = req.body.star;
  schoolEdit.position = req.body.position;
  schoolEdit.at = req.body.at;
  schoolEdit.type = req.body.type;
  schoolEdit.level = req.body.level;
  School.findOneAndUpdate(
    { title: req.body.title },
    { $set: schoolEdit },
    { new: true }
  ).then((school) => {
    if (!school) {
      return res.status(400).json({errors: "not found School"});
    }
    res.json({ success: "successed" })
  });
});

//level add
router.post("/level/add/:title", (req, res) => {
  Levels.findOne({ level: req.body.level }).then((level) => {
    if (!level) {
      return res.status(400).json({ errors: "Level is not exists" });
    }
    const level_id = level._id;
    School.findOne({ title: req.params.title }).then((school) => {
      if (!school) {
        return res.status(400).json({ errors: "School is not exists" });
      }
      if (school.level.includes(level_id)) {
        return res.status(400).json({ errors: req.body.level + " is exits" });
      } else {
        school.level.push(level_id);
        school.save().then((school) => {
          res.json(school);
        });
      }
    });
  });
});

//school/getByPrivate
router.get("/getByPrivate", (req, res) => {
  // School.findOne({type: 'private'})
  School.find().then((school) => {
    if (!school) {
      return res.status(400).json({ errors: "Not found" });
    }
    return res.status(200).json(school);
  });
});
//school/getByName
router.get("/getByName", (req, res) => {
  // School.findOne({type: 'private'})
  console.log(req.body.title);
  School.findOne({ title: req.body.title }).then((school) => {
    if (!school) {
      return res.status(400).json({ errors: "Not found" });
    }
    return res.status(200).json(school);
  });
});

module.exports = router;
