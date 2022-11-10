const router = require('express').Router();
const Hotel = require('../models/Hoteis');


router.post('/', async (req, res) =>{

    const {nome, endereco, cidade, estado} = req.body;
  
    const hotel = {
        nome,
        endereco,
        cidade,
        estado
    }
    try{
        await Hotel.create(hotel)
        res.status(201).json({message: 'Hotel inserido com sucesso.', hotel})

    }catch(error){
        res.status(500).json({error: error})
    }
})

//Obter todos hoteis
router.get('/', async (req, res) => {
    try{
        const hoteis = await Hotel.find()
        res.status(200).json(hoteis)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Obter hotel by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try{
        const hoteis = await Hotel.findOne({_id: id})
        if(hoteis)
            res.status(200).json(hoteis)
        else
            res.status(200).json({message: "Nenhum hotel encontrado!"})

    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Update
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const {nome, endereco, cidade, estado} = req.body;
  
    const hotel = {
        nome,
        endereco,
        cidade,
        estado
    }
    
    try{
        const hotelAtualizado = await Hotel.updateOne({_id: id}, hotel)
        if(hotelAtualizado.matchedCount === 0){
            res.status(422).json({message: 'Hotel não encontrado!'})
            return;
        }
        res.status(200).json({message: 'Hotel editado com sucesso!'})
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try{
        const hoteis = await Hotel.deleteOne({_id: id})
        res.status(200).json({message: "Hotel removido com sucesso!"})

    }catch(error){
        res.status(500).json({error: error.message})
    }
})
module.exports = router;