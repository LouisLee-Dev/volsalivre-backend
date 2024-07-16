const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ShiftSchema = new Schema({
    shift: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = Shift = mongoose.model("shift", ShiftSchema);
