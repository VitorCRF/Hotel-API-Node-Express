const router = require('express').Router();
const Quarto = require('../models/Quartos');


router.post('/', async (req, res) => {

    var { hotel_id, numero, tipo, valor, adaptacao_especial, ocupado, dataOcupadoInicio, dataOcupadoFim } = req.body;
    if (dataOcupadoInicio.split("/").length == 3 && dataOcupadoFim.split("/").length == 3) {

        var dia = dataOcupadoInicio.split("/")[0];
        var mes = dataOcupadoInicio.split("/")[1];
        var ano = dataOcupadoInicio.split("/")[2];
        dataOcupadoInicio = new Date(mes + "/" + dia + "/" + ano);
        dia = dataOcupadoFim.split("/")[0];
        mes = dataOcupadoFim.split("/")[1];
        ano = dataOcupadoFim.split("/")[2];
        dataOcupadoFim = new Date(mes + "/" + dia + "/" + ano);
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
        try {
            await Quarto.create(quarto)
            res.status(201).json({ message: 'Quarto inserido com sucesso.', quarto })

        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    else {
        res.status(500).json({ message: "Insira uma data no formato válido." })
    }
})

//Obter todos quartos
router.get('/', async (req, res) => {
    try {
        const quartos = await Quarto.find()
        res.status(200).json(quartos)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})



//Obter quarto by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const quartos = await Quarto.findOne({ _id: id })
        if (quartos)
            res.status(200).json(quartos)
        else
            res.status(200).json({ message: "Nenhum quarto encontrado!" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Obter quarto por hotel ID
router.get('/FindByHotelId/:id', async (req, res) => {
    const id = req.params.id
    try {
        const quartos = await Quarto.find({ hotel_id: id })
        if (quartos)
            res.status(200).json(quartos)
        else
            res.status(200).json({ message: "Nenhum quarto encontrado!" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Obter quartos livres por data
router.post('/GetRoomsFreeByDate', async (req, res) => {
    var { dataInicio, dataFim } = req.body;
    var dia = dataInicio.split("/")[0];
        var mes = dataInicio.split("/")[1];
        var ano = dataInicio.split("/")[2];
        dataInicio = new Date(ano + "/" + mes + "/" + dia);
        dia = dataFim.split("/")[0];
        mes = dataFim.split("/")[1];
        ano = dataFim.split("/")[2];
        dataFim = new Date(ano + "/" + mes + "/" + dia);
    console.log(dataFim);
    try {
        var quartos = await Quarto.find();
        quartos = quartos.filter(x => (x.dataOcupadoInicio < dataInicio || x.dataOcupadoInicio > dataFim) &&
            (x.dataOcupadoFim < dataInicio || x.dataOcupadoFim > dataFim))
        if (quartos)
            res.status(200).json(quartos)
        else
            res.status(200).json({ message: "Nenhum quarto encontrado!" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Update
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    var { hotel_id, numero, tipo, valor, adaptacao_especial, ocupado, dataOcupadoInicio, dataOcupadoFim } = req.body;

    var dia = dataOcupadoInicio.split("/")[0];
        var mes = dataOcupadoInicio.split("/")[1];
        var ano = dataOcupadoInicio.split("/")[2];
        dataOcupadoInicio = new Date(mes + "/" + dia + "/" + ano);
        dia = dataOcupadoFim.split("/")[0];
        mes = dataOcupadoFim.split("/")[1];
        ano = dataOcupadoFim.split("/")[2];
        dataOcupadoFim = new Date(mes + "/" + dia + "/" + ano);
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

    try {
        const quartoAtualizado = await Quarto.updateOne({ _id: id }, quarto)
        if(quartoAtualizado.matchedCount === 0){
            res.status(422).json({message: 'Quarto não encontrado!'})
            return;
        }
        res.status(200).json({ message: 'Quarto editado com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const quartos = await Quarto.deleteOne({ _id: id })
        res.status(200).json({ message: "Quarto removido com sucesso!" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
module.exports = router;