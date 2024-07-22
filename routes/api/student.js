const express = require("express");
const router = express.Router();

const validateStudentRegisterInput = require("../../validation/student");
const Student = require("../../models/Student");

// Get all Students
router.get("/", async (req, res) => {
  try {
    const Students = await Student.find();
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
        if(req.body.name) StudentEdit.name = req.body.name;
        if(req.body.parent) StudentEdit.parent = req.body.parent;
        if(req.body.cpf) StudentEdit.cpf = req.body.cpf;        
        if(req.body.series) StudentEdit.serie = req.body.series;
        if(req.body.year) StudentEdit.year = req.body.year;        
        if(req.body.status) StudentEdit.status = req.body.status;
  
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
      cpf: req.body.cpf,      
      series: req.body.series,
      year: req.body.year,
      status: req.body.status,      
    });

    await newStudent.save();
    return res.json({ success: "Student added successfully" });

  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

// Get one Student (fallback route)
router.post("/all", async (req, res) => {  
  try {
    let students;
    if(!req.body)
      students = await Student.find();
    else {
      const query = {};
      if (req.body.name) query.name = { $regex: req.body.name, $options: 'i' };
      if (req.body.parent) query.parent = { $regex: req.body.parent, $options: 'i' };
      if (req.body.cpf) query.cpf = { $regex: req.body.cpf, $options: 'i' };
      if (req.body.series) query.series = req.body.series;
      if (req.body.year) query.year = req.body.year;   
      if (req.body.status) query.status = req.body.status;
      students = await Student.find(query);
    }
    if (!students) {
      return res.status(400).json({ errors: "No Students found" });
    }
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
