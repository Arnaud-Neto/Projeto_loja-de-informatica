const session = require('express-session');
const express = require('express');
const LoginRouter = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');
const {normalizarString , noInvalidChars} = require('../helpers/normalizarString');
const Usuario = mongoose.model('Usuario');
const Adm = mongoose.model('Adm');


LoginRouter.use(session({
    secret:"secret",
    resave: true,
    saveUninitialized: true
}));


LoginRouter.get("/", (req, res) => {
    res.render("login.hbs");
});


LoginRouter.post("/", (req, res) => {
    const {nome_de_usuario, senha} = req.body; // pegando o nome de usuario e senha

    // normalizando e removendo caracteres invalidos
    nome_de_usuario = noInvalidChars(normalizarString(nome_de_usuario));
    senha = noInvalidChars(senha);

    
    let  senha_criptografada = crypto.createHash("sha256", senha + "secret");// criptografando a senha
    Usuario.findOne({nome_de_usuario, senha_criptografada}) // procurando o usuario no banco de dados
    .then(usuario => {
        if(usuario){ // se o usuario existir

            req.session.usuario = usuario; // setando o usuario na sessao
            req.session.hash = crypto.createHash("sha256", senha_criptografada + session.id); // criando um hash para a sessao
            res.redirect("/"); // redirecionando para a pagina principal
        
        } else { // se o usuario nao existir

            let senha_criptografada = crypto.createHash("sha256", senha + "secret" + "admin"); // criptografando a senha para admin
            Adm.findOne({nome_de_usuario, senha_criptografada}) // procurando o admin no banco de dados
            .then((adm) => { 
                if(adm){ // se o admin existir

                    req.session.adm = adm; // setando o admin na sessao
                    req.session.hash = crypto.createHash("sha256", senha_criptografada + session.id); // criando um hash para a sessao
                    res.redirect("/dev"); // redirecionando para a pagina dev

                } else { // se o admin nao existir

                    res.render("login.hbs", {
                        message: "Nome de usuário ou senha inválidos!" // enviando uma mensagem de erro
                    });
                }
            })
        }
    })
    .catch(err => { // se ocorrer um erro
        res.status(500).send("Erro interno no servidor!"); // enviando uma mensagem de erro
    });
});

module.exports = LoginRouter;