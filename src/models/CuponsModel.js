const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CuponsSchema = new Schema({
    codigo: {
        type: String,
        required: true
    },
    desconto: {
        type: Number,
        required: true
    },
    validade: {
        type: Date,
        required: true
    },
    condicoes: [{
        type: Schema.Types.ObjectId,
        required: true
    }]
});

module.exports = mongoose.model("Cupons", CuponsSchema);