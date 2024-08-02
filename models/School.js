const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const SchoolSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  mark: {
    data: Buffer,
    contentType: String,
  },
  star: {
    type: String,
    required: false
  },
  level: {
    type: Schema.Types.ObjectId,
    ref: 'levels',
    required: true,
  },
  series: {
    type: Schema.Types.ObjectId,
    ref: 'series',
    required: true,
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: "cities",
    required: true
  },
  neigh: {
    type: Schema.Types.ObjectId,
    ref: "neighs",
    required: true
  },
  years: [{    // school year
    type: String,
    ref: 'periodo',
    required: false
  }],
  turno: [{  // shift : morning , afternoon
    type: String,
    ref: "turno",
    required: false
  }],
  tipo: {  // public, private
    type: String,
    ref: "tipo",
    required: false
  },
  scholarUnit: {  // currency unit
    type:String,
    required: false
  },
  amount: {    // currency amount
    type:String,
    required: false
  },
  monthlyState: { // monthly fee percent
    type: String,
    required: false,
  },
  regFee: { // real monthly currency
    type: String,
    required: false,
  },  
  vagas: {  // resting count
    type: Number,
    required: false,
    default: 0,
  },
  fullvagas: {
    type: Number,
    required: false,
    default: 0,
  },
  comments: {
    type: String,
    required: false,
  },
  date: {  // register date
    type: Date,
    default: Date.now(),
  },
});

module.exports = School = mongoose.model("schools", SchoolSchema);
