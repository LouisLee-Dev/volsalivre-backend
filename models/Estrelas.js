const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EstrelasSchema = new Schema({
    school: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    star: {
        type: Number,
        required: true,
    },

})

module.exports = Estrelas = mongoose.model('levels', EstrelasSchema);

// 1