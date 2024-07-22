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
  series: [{
    type: String,
    require: false,
  }],
  level:[{ 
    level:{   // senior middle school   level id
      type: String,
      required: false
    },
    grade:{  // 1- 3 years  ex: 3
      type: String,
      required: false
    }
  }],
  position: {  //   detail position ( distance )
    type:String,
    required:false
  },
  at: {  // region  (sao paulo)
    type: String,
    required: false
  },
  years: [{    // school year
    type: String,
    required: false
  }],
  shift: [{  // shift : morning , afternoon
    type: String,
    required: false
  }],
  type: {  // public, private
    type: String,
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
