const router = require('express').Router();
const Cliente = require('../models/Clientes');


router.post('/', async (req, res) =>{

    const dados_pessoais = req.body;
  
    const cliente = {
        dados_pessoais
    }
    try{
        await Cliente.create(cliente)
        res.status(201).json({message: 'Cliente inserido com sucesso.'})

    }catch(error){
        res.status(500).json({error: error})
    }

})

//Obter todos clientes
router.get('/', async (req, res) => {
    try{
        const clientes = await Cliente.find()
        res.status(200).json(clientes)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Obter cliente by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try{
        const clientes = await Cliente.findOne({_id: id})
        if(clientes)
            res.status(200).json(clientes)
        else
            res.status(200).json({message: "Nenhum cliente encontrado!"})

    }catch(error){
        res.status(500).json({error: error.message})
    }
})


//Update
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const dados_pessoais = req.body;
  
    const cliente = {
        dados_pessoais
    }

    try{
        const clientes = await Cliente.updateOne({_id: id}, cliente)
        res.status(200).json(cliente)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try{
        const clientes = await Cliente.deleteOne({_id: id})
        res.status(200).json({message: "Usuário removido com sucesso!"})

    }catch(error){
        res.status(500).json({error: error.message})
    }
})
module.exports = router;