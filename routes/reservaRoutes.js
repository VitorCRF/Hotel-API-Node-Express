const router = require('express').Router();
const Reserva = require('../models/Reservas');


router.post('/', async (req, res) => {

    var { quarto_id, cliente_id, funcionario_id, data_entrada, data_saida, cancelada, checkin, checkout } = req.body;
    if (quarto_id != undefined && cliente_id != undefined && funcionario_id != undefined &&
        data_entrada != undefined && data_saida != undefined && cancelada != undefined &&
        checkin != undefined && checkout != undefined) {

        if (data_entrada.split("/").length == 3 && data_saida.split("/").length == 3) {

            var dia = data_entrada.split("/")[0];
            var mes = data_entrada.split("/")[1];
            var ano = data_entrada.split("/")[2];
            data_entrada = new Date(mes + "/" + dia + "/" + ano);
            dia = data_saida.split("/")[0];
            mes = data_saida.split("/")[1];
            ano = data_saida.split("/")[2];
            data_saida = new Date(mes + "/" + dia + "/" + ano);

            const reserva = {
                quarto_id,
                cliente_id,
                funcionario_id,
                data_entrada,
                data_saida,
                cancelada,
                checkin,
                checkout
            }
            try {
                await Reserva.create(reserva)
                res.status(201).json({ message: 'Reserva inserido com sucesso.', reserva })

            } catch (error) {
                res.status(500).json({ error: error })
            }
        }
        else {
            res.status(500).json({ message: "Insira uma data no formato válido." })
        }
    }
    else {
        res.status(500).json({ message: "Todos os campos devem ser preenchidos." })

    }
})

//Obter todas reservas
router.get('/', async (req, res) => {
    try {
        const reservas = await Reserva.find()
        res.status(200).json(reservas)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Obter reserva by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const reservas = await Reserva.findOne({ _id: id })
        if (reservas)
            res.status(200).json(reservas)
        else
            res.status(200).json({ message: "Nenhum reserva encontrado!" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Obter hospedagem quarto por quarto ID
router.get('/FindByQuartoId/:id', async (req, res) => {
    const id = req.params.id
    try {
        const reservas = await Reserva.find({ quarto_id: id })
        if (reservas)
            res.status(200).json(reservas)
        else
            res.status(200).json({ message: "Nenhuma reserva encontrada!" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Update
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { quartoId, clienteId, funcionarioId, dataEntrada, dataSaida, cancelada, checkin, checkout } = req.body;

    const reserva = {
        quartoId,
        clienteId,
        funcionarioId,
        dataEntrada,
        dataSaida,
        cancelada,
        checkin,
        checkout
    }

    try {
        const reservas = await Reserva.updateOne({ _id: id }, reserva)
        res.status(200).json({ message: 'Reserva editado com sucesso!' }, reserva)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const reservas = await Reserva.deleteOne({ _id: id })
        res.status(200).json({ message: "Reserva removido com sucesso!" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
module.exports = router;