const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AtributosDeProdutoSchema = new Schema({
    tipo: {
        type: Schema.Types.ObjectId,
        ref: "TipoAtributoDeProduto",
        required: true
    },
    valor: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("AtributosDeProduto", AtributosDeProdutoSchema);
