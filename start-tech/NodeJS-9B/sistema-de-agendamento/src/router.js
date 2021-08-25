// Importacao
// import { Router } from 'express';

const { Router } = require('express');

// Instanciando o Router
const routes = new Router();

// Tratando as rotas
routes.get('/', (req, res) => {
    return res.json({message: 'Okay'});
});

// Exportando as rotas para consumir no arquivo app.js
module.exports = routes;
