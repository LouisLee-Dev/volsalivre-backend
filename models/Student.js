const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: false,
  },  
  school: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
  },
  year: {    // school year
    type: String,
    ref: 'periodo',
    required: false
  },
  tipo: {
    type: Schema.Types.ObjectId,
    ref: "tipos",
    required: true,
  },
  date: {  // register date
    type: Date,
    default: Date.now(),
  },
});

module.exports = Student = mongoose.model("students", StudentSchema);
