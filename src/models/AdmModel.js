const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdmSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    nome_de_usuario:{
        type: String,
        required: true
    },
    senha: {
        type: Number,
        required: true
    },
    clerence: [{
        type: Number,
        required: true
    }]
});

module.exports = mongoose.model("Adm", AdmSchema);