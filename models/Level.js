const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LevelsSchema = new Schema({
    level: {
        type: String,
        required: true,
    },
})

module.exports = Levels = mongoose.model('levels', LevelsSchema);

// Educação infantil
// Fundamental I
// Fundamental II
// Ensino médio