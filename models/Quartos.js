const mongoose = require('mongoose');

const Quarto = mongoose.model('Quartos', {
    hotel_id: String,
    numero: Number,
    tipo: String,
    valor: Number,
    adaptacao_especial: Boolean,
    ocupado: Boolean,
    dataOcupadoInicio: Date,
    dataOcupadoFim: Date
})

module.exports = Quarto;