const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: 'status',
    required: false
  },
  institution:{
    type: Schema.Types.ObjectId,
    ref: 'schools',
    required: false
  },
  serios: {
    type: Schema.Types.ObjectId,
    ref: 'levels',
    required: false
  },
  neighhood: {
    type: String,
    required: false
  },
  managerName: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: 'customer',
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = User = mongoose.model('users', UserSchema);
