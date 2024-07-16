const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LevelsSchema = new Schema({
    level: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Levels = mongoose.model('levels', LevelsSchema);