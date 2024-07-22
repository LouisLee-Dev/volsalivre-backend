const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: String,
    required: false,
  },
  cpf: {
    type: String,
    required: false
  },
  // insert series field
  serie: {
    type: String,
    requireed: false
  },
  year: {    // school year
    type: String,
    required: false
  },
  status: {
    type: String,
    requireed: false
  },
  date: {  // register date
    type: Date,
    default: Date.now(),
  },
});

module.exports = Student = mongoose.model("students", StudentSchema);
