const express = require("express");
const router = express.Router();
const School = require("../../models/School");
const upload = require('../../middleware/upload');
const { isEmpty } = require("../../validation/is-empty");
const validateSchoolRegisterInput = require("../../validation/schools");

router.post("/add", upload.single('mark'), async (req, res) => {
  const { errors, isValid } = validateSchoolRegisterInput(req.body);

  if (!isValid) {
    console.log(errors);
    return res.status(400).json(errors);
  }


  try {
    const existingSchool = await School.findOne({ title: req.body.title });
    const schoolData = {
      user: req.body.user,
      title: req.body.title,
      star: req.body.star,
      city: req.body.city,
      neigh: req.body.neigh,
      type: req.body.type,
      level: req.body.level,
      series: req.body.series,
      years: JSON.parse(req.body.years || '[]'),
      turno: JSON.parse(req.body.turno || '[]'),
      amount: req.body.amount,
      monthlyState: req.body.monthlyState,
      regFee: req.body.regFee,
      vagas: req.body.vagas,
      fullvagas: req.body.fullvagas,
      scholarUnit: req.body.scholarUnit,
      comments: req.body.comments,
      mark: req.file ? { contentType: req.file.mimetype, data: req.file.buffer } : undefined,
    };

    console.log(schoolData);

    if (existingSchool) {
      const updatedSchool = await School.findOneAndUpdate(
        { title: req.body.title },
        { $set: schoolData },
        { new: true }
      );
      if (!updatedSchool) {
        return res.status(400).json({ errors: "School not found" });
      }
      return res.json({ success: "School updated successfully" });
    }

    const newSchool = new School(schoolData);
    await newSchool.save();
    return res.json({ success: "School added successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Server error" });
  }
});

router.post("/del", async (req, res) => {
  const { schools } = req.body;
  if(schools && schools.length > 0) {
    for(let i = 0; i < schools.length; ++ i) {
      await School.findOneAndDelete({_id: schools[i]})
    }
  }
})

// Get one school (fallback route)  
router.get("/", async (req, res) => {
  try {
    const query = {};

    console.log(req.params);

    // Build the query conditionally based on request body  
    const conditions = [
      { key: 'user', value: req.params.user },
      { key: 'title', value: req.params.title },
      { key: 'city', value: req.params.city },
      { key: 'neigh', value: req.params.neigh },
      { key: 'level', value: req.params.level },
      { key: 'series', value: req.params.series },
      { key: 'years', value: req.params.years, isArray: true },
      { key: 'turno', value: req.params.turno, isArray: true },
      { key: 'fullvagas', value: req.params.vagas },
      { key: 'amount', value: req.params.amount }
    ];

    for (const cond of conditions) {
      if (cond.value) {
        if (cond.isArray) {
          // If the condition is an array (years or shift), ensure we only add it if it's not empty  
          if (!isEmpty(cond.value)) {

            query[cond.key] = { $in: cond.value };
          }
        } else {
          // For other conditions, apply regex for string matching  
          if (!isEmpty(cond.value))
            query[cond.key] = { $regex: cond.value, $options: 'i' };
        }
      }
    }

    // If no body is sent, find all schools  
    if (Object.keys(req.body).length === 0) {
      await School.find()
        .populate('level', 'level')
        .populate('series', 'series')
        .populate('city', 'cities')
        .populate('neigh', 'neighs')
        .then(schools => {
          res.status(200).json(schools);
        })
        .catch(err => res.status(404).json({ errors: "No schools found" }));
    } else {
      await School.find(query)
        .populate('level', 'level')
        .populate('series', 'series')
        .populate('city', 'city')
        .populate('neigh', 'neigh')
        .then(schools => {
          res.status(200).json(schools);
        })
        .catch(err => res.status(404).json({ errors: "No schools found" }));
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/img/:title', async (req, res) => {
  try {
    const school = await School.findOne({ title: req.params.title });

    if (!school || !school.mark) {
      return res.status(404).send('Image not found');
    }

    res.setHeader('Content-Type', school.mark.contentType);
    res.send(school.mark.data);
  } catch (error) {
    res.status(500).send('Server error');
  }
})

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
// TO DO Task
// Get school by location
router.get("/getByName", async (req, res) => {
  try {
    const school = await School.findOne({ title: req.body.location });
    if (!school) {
      return res.status(400).json({ errors: "School not found" });
    }
    res.status(200).json(school);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
