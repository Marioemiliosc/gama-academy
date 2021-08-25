// Importacao
import { Router } from 'express';

// Instanciando o Router
const routes = new Router();

// Tratando as rotas
routes.get('/', (req, res) => {
    return res.json({message: 'Okay'});
});

// Exportando as rotas para consumir no arquivo app.js
export default routes;
