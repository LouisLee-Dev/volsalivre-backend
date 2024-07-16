const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const SchoolSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  mark: {
    type: String,
    required: false,
  },
  star: {
    type: String,
    required: false
  },
  level:[{
    level:{
      type: String,
      required: false
    },
    grade:{
      type: String,
      required: false
    }
  }],
  position: {
    type:String,
    required:false
  },
  at: {
    type: String,
    required: false
  },
  years: [{
    type: String,
    required: false
  }],
  shift: [{
    type: String,
    required: false
  }],
  date: {
    type: Date,
    default: Date.now(),
  },
  type: {
    type: String,
    required: false
  },
  scholarUnit: {
    type:String,
    required: false
  },
  amount: {
    type:String,
    required: false
  }
});

module.exports = School = mongoose.model("schools", SchoolSchema);
