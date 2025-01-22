const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FornecedorSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    cnpj: {
        type: String,
        required: true
    },
    endereco: {
        type: Schema.Types.ObjectId,
        ref: "Endereco",
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Fornecedor", FornecedorSchema);