const router = require('express').Router();
const Reserva = require('../models/Reservas');


router.post('/', async (req, res) =>{

    const { quartoId, clienteId, funcionarioId, dataEntrada, dataSaida, cancelada, checkin, checkout} = req.body;
  
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
    try{
        await Reserva.create(reserva)
        res.status(201).json({message: 'Reserva inserido com sucesso.', reserva})

    }catch(error){
        res.status(500).json({error: error})
    }
})

//Obter todos hospedagess
router.get('/', async (req, res) => {
    try{
        const reservas = await Reserva.find()
        res.status(200).json(reservas)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Obter reserva by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try{
        const reservas = await Reserva.findOne({_id: id})
        if(reservas)
            res.status(200).json(reservas)
        else
            res.status(200).json({message: "Nenhum reserva encontrado!"})

    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Update
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { quartoId, clienteId, funcionarioId, dataEntrada, dataSaida, cancelada, checkin, checkout} = req.body;
  
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

    try{
        const reservas = await Reserva.updateOne({_id: id}, reserva)
        res.status(200).json({message: 'Reserva editado com sucesso!'}, reserva)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try{
        const reservas = await Reserva.deleteOne({_id: id})
        res.status(200).json({message: "Reserva removido com sucesso!"})

    }catch(error){
        res.status(500).json({error: error.message})
    }
})
module.exports = router;