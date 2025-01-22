const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProdutoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: "TipoProduto",
        required: true
    },
    atributos: [{
        type: Schema.Types.ObjectId,
        ref: "AtributosDeProduto",
        required: false
    }],
    fornecedor: {
        type: Schema.Types.ObjectId,
        ref: "Fornecedor",
        required: true
    }
});

module.exports = mongoose.model("Produto", ProdutoSchema);