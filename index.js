//Alunos
//Lucas Kusman Leal
//Tiago Felipe Muller
//Vitor Felix de Araujo
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const uri = "mongodb://localhost:27017/somativa";

async function connect(){
    try {
        await mongoose.connect(uri).then(() =>{
            console.log("conectado no mongo");
            app.listen(3000)

        });
    }catch(error){
        console.log(error);
    }
}

connect();

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

const clienteRoutes = require('./routes/clienteRoutes')
const funcionarioRoutes = require('./routes/funcionarioRoutes')
const hospedagemRoutes = require('./routes/hospedagemRoutes')
const hotelRoutes = require('./routes/hotelRoutes')
const quartoRoutes = require('./routes/quartoRoutes')
const reservaRoutes = require('./routes/reservaRoutes')



app.use('/cliente', clienteRoutes)
app.use('/funcionario', funcionarioRoutes)
app.use('/hospedagem', hospedagemRoutes)
app.use('/hotel', hotelRoutes)
app.use('/quarto', quartoRoutes)
app.use('/reserva', reservaRoutes)









