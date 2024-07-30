const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ModalidadeSchema = new Schema({
    level: {
        type: String,
        required: true,
    },
})

module.exports = Modalidade = mongoose.model('modalidade', ModalidadeSchema);

// Presencial
// Virtual
// Semipresencial
// Flex
// Online
// EAD