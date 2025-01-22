// importações principais
const express = require('express');
const app = express();

// constantes
const ROTA_PRINCIPAL = "/login";

// configurando o banco de dados
require('../config/database');

// usando middleware basicos
app.use(express.json());

// importando routers
// ...

//importando middlewares
// ...

// usando middlewares e routers
// ...

// criando rotas base
app.get("/", (req, res) => {
    res.redirect("/login")
})


// cuidando do error 404
const template_generic_error = require("./views/genericError.hbs");
app.all("/*", (req, res) => {
    res.status(404).render(template_generic_error, {
        title: '404 - Não Encontrado',
        message: `A pagina que você estava procurando (${req.originalUrl}) não existe!.`
    });
})