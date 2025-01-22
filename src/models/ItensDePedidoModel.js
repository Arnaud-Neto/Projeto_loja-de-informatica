const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItensDePedidoSchema = new Schema({
    produto: {
        type: Schema.Types.ObjectId,
        ref: 'Produto',
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    preco: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('ItensDePedido', ItensDePedidoSchema);