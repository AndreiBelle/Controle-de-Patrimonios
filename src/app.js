require('dotenv').config()
const express = require('express');                         //impotando o motor principal do servidor (resumindo ele facilita a criação das rotas)
const cors = require('cors');                               // Permite o servidor a aceitar pedidos de outros sites/dominios;                            
const pool = require('../src/Database/index');            //Importando conexão do Banco
const dadosRouters = require('./Routers/dadosRouters')
const path = require('path');
// const helmet = require('helmet');


const app = express();


app.use(express.json())      // "Ensinando" o serv a ler pacotes de dados no formato de JSON;
app.use(cors()); 


// app.use(express.static...): ESSENCIAL. Diz ao Node que a pasta 'public' é aberta.
// Sem isso, seu HTML não consegue carregar o CSS ou imagens.
app.use(express.static(path.join(__dirname, '../public')));

// Conecta todas as rotas que criamos no arquivo acima na raiz do site
app.use('/', dadosRouters);

module.exports = app;