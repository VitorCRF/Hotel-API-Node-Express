const mongoose = require('mongoose');

const Hotel = mongoose.model('Hoteis', {
    nome: String,
    endereco: String,
    cidade: String,
    estado: String
})

module.exports = Hotel;