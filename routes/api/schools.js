const express = require("express");
const router = express.Router();
const upload = require('../../middleware/upload');
const validateSchoolRegisterInput = require("../../validation/schools");
const School = require("../../models/School");
const Levels = require("../../models/Levels"); // Assuming you have a Levels model
const { isEmpty } = require("../../validation/is-empty");

// Get all schools
router.get("/", async (req, res) => {
  try {
    const schools = await School.find();
    res.status(200).json(schools);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new school
router.post("/add", upload.single('mark'), async (req, res) => {    
  const { errors, isValid } = validateSchoolRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }  

  try {
    const existingSchool = await School.findOne({ title: req.body.title });    

    if (existingSchool) {
      const schoolEdit = {};
        if(req.body.title) schoolEdit.title = req.body.title;
        if(req.body.star) schoolEdit.star = req.body.star;
        if(req.body.position) schoolEdit.position = req.body.position;
        if(req.body.at) schoolEdit.at = req.body.at;
        if(req.body.type) schoolEdit.type = req.body.type;
        if(req.body.level) schoolEdit.level = JSON.parse(req.body.level);
        if(req.body.years) schoolEdit.years = JSON.parse(req.body.years);
        if(req.body.shift) schoolEdit.shift = JSON.parse(req.body.shift);
        if(req.body.series) schoolEdit.series = req.body.series;
        if(req.body.amount) schoolEdit.amount = req.body.amount;
        if(req.body.monthlyState) schoolEdit.monthlyState = req.body.monthlyState;
        if(req.body.regFee) schoolEdit.regFee = req.body.regFee;
        if(req.body.vagas) schoolEdit.vagas = req.body.vagas;
        if(req.body.scholarUnit) schoolEdit.scholarUnit = req.body.scholarUnit;
        if(req.body.mark) schoolEdit.mark = { contentType: req.file.mimetype, data: req.file.buffer };
  
      const updatedSchool = await School.findOneAndUpdate(
        { title: req.body.title },
        { $set: schoolEdit },
        { new: true }
      );
  
      if (!updatedSchool) {
        return res.status(400).json({ errors: "School not found" });
      }  
      return res.json({ success: "School updated successfully" });
    }

    const newSchool = new School({
      title: req.body.title,
      mark: req.body.mark,
      star: req.body.star,
      level: JSON.parse(req.body.level),
      position: req.body.position,
      at: req.body.at,
      years: JSON.parse(req.body.years),
      shift: JSON.parse(req.body.shift),
      series: req.body.series,
      type: req.body.type,
      amount: req.body.amount,
      monthlyState: req.body.monthlyState,
      regFee: req.body.regFee,
      vagas: req.body.vagas,
      scholarUnit: req.body.scholarUnit,
      // eslint-disable-next-line no-dupe-keys
      mark: { contentType: req.file.mimetype, data: req.file.buffer }
    });    
    
    await newSchool.save();
    return res.json({ success: "School added successfully" });

  } catch (err) {
    return res.status(500).json({ error: err });
  }
});


// Add level to a school
router.post("/level/add/:title", async (req, res) => {
  try {
    const level = await Levels.findOne({ level: req.body.level });
    if (!level) {
      return res.status(400).json({ errors: "Level does not exist" });
    }

    const school = await School.findOne({ title: req.params.title });
    if (!school) {
      return res.status(400).json({ errors: "School does not exist" });
    }

    if (school.level.includes(level._id)) {
      return res.status(400).json({ errors: `${req.body.level} already exists` });
    }

    school.level.push(level._id);
    await school.save();
    res.json(school);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get schools by type 'private'
router.get("/getByPrivate", async (req, res) => {
  try {
    const schools = await School.find({ type: 'private' });
    if (!schools.length) {
      return res.status(400).json({ errors: "No private schools found" });
    }
    res.status(200).json(schools);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get school by name
router.get("/getByName", async (req, res) => {
  try {
    const school = await School.findOne({ title: req.body.title });
    if (!school) {
      return res.status(400).json({ errors: "School not found" });
    }
    res.status(200).json(school);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get one school (fallback route)
router.post("/all", async (req, res) => {  
  
  try {
    let schools;
    if(!req.body)
      schools = await School.find();
    else {
      const query = {};
      if (req.body.title) query.title = { $regex: req.body.title, $options: 'i' };      
      // if (req.body.star) query.star = req.body.star;
      if (req.body.position) query.position = { $regex: req.body.position, $options: 'i' };
      if (req.body.at) query.at = { $regex: req.body.at, $options: 'i' };
      if (req.body.level) query['level.level'] = {$in: req.body.level};
      if (req.body.vagas) query.vagas = req.body.vagas;
      if (req.body.years && !isEmpty(req.body.years)) query.years = { $in: req.body.years };
      if (req.body.shift && !isEmpty(req.body.shift)) query.shift = { $in: req.body.shift };
      if (req.body.series && !isEmpty(req.body.series)) query.series = { $in: req.body.series };
      // if (req.body.type) query.type = req.body.type;      
      if (req.body.amount) query.amount = req.body.amount;
      schools = await School.find(query);
    }
    if (!schools) {
      return res.status(400).json({ errors: "No schools found" });
    }
    res.status(200).json(schools);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/img/:title', async (req, res) => {    
  try {
    const school = await School.findOne({title: req.params.title});
    console.log(school.mark);

    if(!school || !school.mark) {
      return res.status(404).send('Image not found');
    }

    res.setHeader('Content-Type', school.mark.contentType);
    res.send(school.mark.data);
  } catch (error) {
    res.status(500).send('Server error');
  }
})

module.exports = router;
