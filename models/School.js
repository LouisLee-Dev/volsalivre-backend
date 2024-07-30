const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const SchoolSchema = new Schema({
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
  monthlyState: {
    type: String,
    required: false,
  },
  regFee: {
    type: String,
    required: false,
  },
  vagas: {
    type: String,
    required: false,
  },
  date: {  // register date
    type: Date,
    default: Date.now(),
  },
});

module.exports = School = mongoose.model("schools", SchoolSchema);
