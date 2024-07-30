const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SeriesSchema = new Schema({    
    series: {
        type: String,
        required: true,
    },
    levelId: {
        type: Schema.Types.ObjectId,
        ref: 'levels',
        required: true,
    }
});

module.exports = Series = mongoose.model("series", SeriesSchema);

// Educação infantil	Berçário 1 (0 à 1 ano)
// Berçário 2 (até 23 meses)
// Maternal 1 (2 anos)
// Maternal 2 (3 anos)
// Pré 1 (4 anos)
// Pré 2 (5 anos)

// Fundamental I	1º ano - fundamental 1
// 2º ano  - fundamental 1
// 3º ano - fundamental 1
// 4º ano - fundamental 1
// 5º ano - fundamental 1
// 6º ano - fundamental 2
// 7º ano - fundamental 2
// 8º ano - fundamental 2
// 9º ano - fundamental 2

// Ensino médio	1ª série - ensino médio
// Ensino médio	2ª série - ensino médio
// Ensino médio	3ª série - ensino médio

// Ensino médio	1ª série - EJA
// Ensino médio	2ª série - EJA
// Ensino médio	3ª série - EJA