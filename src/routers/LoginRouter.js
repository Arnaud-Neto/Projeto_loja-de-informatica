const express = require('express');
const LoginRouter = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const AdmController = require("../controllers/AdmController");

// constates 
const CAMINHO_PAGINA_PRINCIPAL = "/";
const CAMINHO_PAGINA_PRINCIPAL_ADM = "/adm"


// rotas

LoginRouter.get("/", (req, res) => { // tela de login
    res.render("login.hbs");
});


LoginRouter.post("/", (req, res) => { // efetuando login

    const { nome_de_usuario, senha } = req.body; // pegando dados
    
    UsuarioController.autenticarUsuario(nome_de_usuario, senha) // autenticando usuario
    .then((usuario) => { // usuario encotrado
        req.session.usuario = usuario; // adicionando a session
        res.redirect(CAMINHO_PAGINA_PRINCIPAL); // redirecionando para a pagina principal
    })
    .catch((error) => { // error
        res.status(401).render("login.hbs", { // tela de login
            error: error.message // renderisando messagem de error
        });
    });
});


LoginRouter.get("/logout", (req, res) => { // logout
    req.session.usuario = undefined; // retirando dados do usuario
    res.redirect(CAMINHO_PAGINA_PRINCIPAL); // redirecionando a pagina principal
});


LoginRouter.get("/adm", (req, res) => { // tela de login para adimins
    res.render("loginAdm.hbs"); 
});


LoginRouter.post("/adm", (req, res) => { // efetuando o login como adm

    const { nome_de_usuario, senha } = req.body; // pegando dados
    
    AdmController.autenticarUsuario(nome_de_usuario, senha) // autenticando adm
    .then((usuario) => { // adm encontrado
        req.session.usuario = usuario; // gardando dados na session
        res.redirect(CAMINHO_PAGINA_PRINCIPAL_ADM); // redirecionando para a pagina principal do adm
    })
    .catch((error) => { // error
        res.status(401).render("loginAdm.hbs", { // tela de login adm
            error: error.message // renderisando menssagem de erro
        });
    });
});

module.exports = LoginRouter;