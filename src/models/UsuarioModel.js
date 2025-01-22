const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    nome: {
        type:String,
        required: true
    },
    apelido: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    endereco: {
        type: Schema.Types.ObjectId,
        ref: "Endereco",
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    nome_de_usuario: {
        type: String,
        required: true
    },
    senha: {
        type: Number,
        required: true
    },
    cupons: {
        type: [Schema.Types.ObjectId],
        ref: "Cupom",
        required: false
    }
});

module.exports = mongoose.model("Usuario", UsuarioSchema);