const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TipoProdutoSchema = new Schema({
    nome: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("TipoProduto", TipoProdutoSchema);