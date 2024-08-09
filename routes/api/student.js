const express = require("express");
const router = express.Router();

const validateStudentRegisterInput = require("../../validation/student");
const Student = require("../../models/Student");

// Get all Students
router.get("/", async (req, res) => {

  const { name, city, neigh, level, series, tipo } = req.params;

  const query = {};

   if (name) {  
    query.name = { $regex: name, $options: 'i' }; // Case-insensitive regex match for name  
  }  
  
  if (city) {  
    query['school.city'] = city; // Assuming school.city references the city ObjectId  
  }  
  
  if (city) {  
    query['school.neigh'] = neigh; // Assuming school.city references the city ObjectId  
  }  

  if (level) {  
    query['school.level'] = level; // Assuming school.level references the level ObjectId  
  }  
  
  if (series) {  
    query['school.series'] = series; // Assuming school.series references the series ObjectId  
  }  
  
  if (tipo) {  
    query.tipo = tipo; // Assuming tipo references the tipo ObjectId  
  }  

  try {
    const Students = await Student.find(query)
      .populate('parent', ['name', 'email', 'cpf'])
      .populate({
        path: 'school',
        select: [
          'title'
        ],
        populate: [
          { path: 'level' },
          { path: 'series' },
          { path: 'city' },
          { path: 'neigh' },
        ],
      })
      .populate('tipo', 'tipo');
    res.status(200).json(Students);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new Student
router.post("/add", async (req, res) => {
  const { errors, isValid } = validateStudentRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const existingStudent = await Student.findOne({ name: req.body.name });

    if (existingStudent) {
      const StudentEdit = {};
      if (req.body.name) StudentEdit.name = req.body.name;
      if (req.body.parent) StudentEdit.parent = req.body.parent;
      if (req.body.school) StudentEdit.serie = req.body.school;
      if (req.body.year) StudentEdit.year = req.body.year;
      if (req.body.tipo) StudentEdit.tipo = req.body.tipo;

      const updatedStudent = await Student.findOneAndUpdate(
        { name: req.body.name },
        { $set: StudentEdit },
        { new: true }
      );

      if (!updatedStudent) {
        return res.status(400).json({ errors: "Student not found" });
      }
      return res.json({ success: "Student updated successfully" });
    }

    const newStudent = new Student({
      name: req.body.name,
      parent: req.body.parent,
      school: req.body.school,
      year: req.body.year,
      tipo: req.body.tipo,
    });

    await newStudent.save();
    return res.json({ success: "Student added successfully" });

  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
