const router = require('express').Router();
const Quarto = require('../models/Quartos');


router.post('/', async (req, res) =>{

    const {hotel_id, numero, tipo, valor, adaptacao_especial, ocupado, dataOcupadoInicio, dataOcupadoFim} = req.body;
  
    const quarto = {
        hotel_id,
        numero,
        tipo,
        valor,
        adaptacao_especial,
        ocupado,
        dataOcupadoInicio,
        dataOcupadoFim
    }
    try{
        await Quarto.create(quarto)
        res.status(201).json({message: 'Quarto inserido com sucesso.', quarto})

    }catch(error){
        res.status(500).json({error: error})
    }
})

//Obter todos quartos
router.get('/', async (req, res) => {
    try{
        const quartos = await Quarto.find()
        res.status(200).json(quartos)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Obter quarto by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try{
        const quartos = await Quarto.findOne({_id: id})
        if(quartos)
            res.status(200).json(quartos)
        else
            res.status(200).json({message: "Nenhum quarto encontrado!"})

    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Update
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const {hotel_id, numero, tipo, valor, adaptacao_especial, ocupado, dataOcupadoInicio, dataOcupadoFim} = req.body;
  
    const quarto = {
        hotel_id,
        numero,
        tipo,
        valor,
        adaptacao_especial,
        ocupado,
        dataOcupadoInicio,
        dataOcupadoFim
    }

    try{
        const quartos = await Quarto.updateOne({_id: id}, quarto)
        res.status(200).json({message: 'Quarto editado com sucesso!'}, quarto)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try{
        const quartos = await Quarto.deleteOne({_id: id})
        res.status(200).json({message: "Quarto removido com sucesso!"})

    }catch(error){
        res.status(500).json({error: error.message})
    }
})
module.exports = router;