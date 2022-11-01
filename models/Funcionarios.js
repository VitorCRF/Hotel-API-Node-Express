const mongoose = require('mongoose');

const Funcionario = mongoose.model('Funcionarios', {
    nome: String,
    funcao: String

})

module.exports = Funcionario;