const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EnderecoSchema = new Schema({
    rua: {
        type: String,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    complemento: {
        type: String,
        required: false
    },
    bairro: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Endereco", EnderecoSchema);