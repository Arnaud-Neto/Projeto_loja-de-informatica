// importações principais
const express = require('express');
const app = express();
const session = require('express-session');


// configurando o banco de dados
require('../config/database');

// usando middleware basicos
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'hbs');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// importando routers
const loginRouter = require('./routers/LoginRouter');
const userRouter = require('./routers/Userrouter')
const admRouter = require('./routers/Admroutes')
const pesquisaRouter = require('./routers/PesquisaRouter');
const cadastroRouter = require('./routers/CadastroRouter');
const ProdutosRouter = require('./routers/ProdutosRouter');

// usando routers
app.use('/login', loginRouter);
app.use('/usuario', userRouter);
app.use('/adm', admRouter);
app.use('/pesquisa', pesquisaRouter);
app.use('/cadastro', cadastroRouter);
app.use('/produtos', ProdutosRouter);


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