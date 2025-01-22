const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CondicaoCupomSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    atibuto: {
        type: String,
        required: true
    },
    operacao: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("CondicaoCupom", CondicaoCupomSchema);