const router = require('express').Router();
const Funcionario = require('../models/Funcionarios');


router.post('/', async (req, res) =>{

    const {nome, funcao} = req.body;
  
    const funcionario = {
        nome,
        funcao
    }
    try{
        await Funcionario.create(funcionario)
        res.status(201).json({message: 'Funcionario inserido com sucesso.', funcionario})

    }catch(error){
        res.status(500).json({error: error})
    }

})

//Obter todos funcionarios
router.get('/', async (req, res) => {
    try{
        const funcionarios = await Funcionario.find()
        res.status(200).json(funcionarios)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Obter funcionario by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try{
        const funcionarios = await Funcionario.findOne({_id: id})
        if(funcionarios)
            res.status(200).json(funcionarios)
        else
            res.status(200).json({message: "Nenhum funcionario encontrado!"})

    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Update
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const {nome, funcao} = req.body;
  
    const funcionario = {
        nome,
        funcao
    }

    try{
        const funcionarios = await Funcionario.updateOne({_id: id}, funcionario)
        res.status(200).json({message: 'Funcionario editado com sucesso!'}, funcionario)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try{
        const funcionarios = await Funcionario.deleteOne({_id: id})
        res.status(200).json({message: "Funcionário removido com sucesso!"})

    }catch(error){
        res.status(500).json({error: error.message})
    }
})
module.exports = router;