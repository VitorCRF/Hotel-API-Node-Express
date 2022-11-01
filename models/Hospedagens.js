const mongoose = require('mongoose');

const Hospedagem = mongoose.model('Hospedagens', {
    reservaId: String,
    clienteId: String,
    consumo: Number,
    valor_total: Number,
    nota_fiscal: String,
    meio_pagamento: String
})

module.exports = Hospedagem;