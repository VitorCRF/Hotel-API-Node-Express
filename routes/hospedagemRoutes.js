const router = require('express').Router();
const Hospedagem = require('../models/Hospedagens');


router.post('/', async (req, res) =>{

    const {reservaId, clienteId, consumo, valor_total, nota_fiscal, meio_pagamento} = req.body;
  
    const hospedagem = {
        reservaId,
        clienteId,
        consumo,
        valor_total,
        nota_fiscal,
        meio_pagamento
    }
    try{
        await Hospedagem.create(hospedagem)
        res.status(201).json({message: 'Hospedagem inserida com sucesso.', hospedagem})

    }catch(error){
        res.status(500).json({error: error})
    }
})

//Obter todos hospedagess
router.get('/', async (req, res) => {
    try{
        const hospedagens = await Hospedagem.find()
        res.status(200).json(hospedagens)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Obter hospedagem by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try{
        const hospedagens = await Hospedagem.findOne({_id: id})
        if(hospedagens)
            res.status(200).json(hospedagens)
        else
            res.status(200).json({message: "Nenhum hospedagem encontrado!"})

    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Update
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const {reservaId, clienteId, consumo, valor_total, nota_fiscal, meio_pagamento} = req.body;
  
    const hospedagem = {
        reservaId,
        clienteId,
        consumo,
        valor_total,
        nota_fiscal,
        meio_pagamento
    }

    try{
        const hospedagemAtualizada = await Hospedagem.updateOne({_id: id}, hospedagem)
        if(hospedagemAtualizada.matchedCount === 0){
            res.status(422).json({message: 'Hospedagem não encontrada!'})
            return;
        }
        res.status(200).json({message: 'Hospedagem editada com sucesso!'})
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try{
        const hospedagens = await Hospedagem.deleteOne({_id: id})
        res.status(200).json({message: "Hospedagem removida com sucesso!"})

    }catch(error){
        res.status(500).json({error: error.message})
    }
})
module.exports = router;