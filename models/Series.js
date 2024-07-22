const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SeriesSchema = new Schema({    
    series: {
        type: String,
        required: true,
    },
    level: {
        type: Schema.Types.ObjectId,
        ref: 'levels'
    }
});

module.exports = Shift = mongoose.model("series", SeriesSchema);
