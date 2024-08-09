const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TipoSchema = new Schema({
    tipo: {
        type: String,
        required: true,
    },
})

module.exports = Tipo = mongoose.model('tipos', TipoSchema);

// Regular (sempre pré selecionado)
// EJA