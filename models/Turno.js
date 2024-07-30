const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TurnoSchema = new Schema({
    turno: {
        type: String,
        required: true,
    },
})

module.exports = Turno = mongoose.model('turno', TurnoSchema);

// manhã
// tarde
// noite
// integral
// integral 6h
// integral 7h
// integral 8h
// integral 9h
// integral 10h
// integral 11h
// integral 12h