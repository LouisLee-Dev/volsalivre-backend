const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PeriodoSchema = new Schema({
    year: {
        type: String,
        required: true,
    },
})

module.exports = Periodo = mongoose.model('periodo', PeriodoSchema);

// 2024
// 2025
// 2024
// 2024.1
// 2024.2
// 2024.3
// 2024.4
// 2025.1
// 2025.2
// 2025.3
// 2025.4
// 2026.1
// 2026.2
// 2026.3
// 2026.4