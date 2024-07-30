const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CitiesSchema = new Schema({
    city: {
        type: String,
        required: true,
    },
})

module.exports = Cities = mongoose.model('cities', CitiesSchema);

// Educação infantil
// Fundamental I
// Fundamental II
// Ensino médio

// Rio de Janeiro
// Nova Iguaçu
// Duque de Caxias
// Niterói
// São Gonçalo