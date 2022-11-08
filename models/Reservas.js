const mongoose = require('mongoose');

const Reserva = mongoose.model('Reservas', {
    quarto_id: String,
    cliente_id: String,
    funcionario_id: String,
    data_entrada: Date,
    data_saida: Date,
    cancelada: Boolean,
    checkin: Boolean,
    checkout: Boolean

})

module.exports = Reserva;