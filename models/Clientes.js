const mongoose = require('mongoose');

const Cliente = mongoose.model('Clientes', {
    dados_pessoais: Object,

})

module.exports = Cliente;