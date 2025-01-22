const mongoose = require("mongoose");
const ItensDePedidoModel = require("./ItensDePedidoModel");

const Schema = mongoose.Schema;
const PedidoSchema = new Schema({
    cliente: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    itemsDePedido: [{
        type: Schema.Types.ObjectId,
        ref: "ItensDePedido",
        required: true
    }],
    status: {
        type: String,
        required: true
    },

    data: {
        type: Date,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    frete: {
        type: Number,
        required: true
    },
    cupons: [{
        type: Schema.Types.ObjectId,
        ref: "Cupons",
        required: false
    }],
    total: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Pedido", PedidoSchema);