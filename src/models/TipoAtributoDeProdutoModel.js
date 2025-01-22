const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TipoAtributoDeProdutoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    unidade: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("TipoAtributoDeProduto", TipoAtributoDeProdutoSchema);