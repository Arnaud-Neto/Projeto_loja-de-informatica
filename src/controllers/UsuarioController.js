const UsuarioModel = require("../models/UsuarioModel");
const crypto = require('crypto');
const { noInvalidChars } = require("../helpers/normalizarString");

module.exports = {

    async getUsuario(nome_de_usuario) {
        if (!noInvalidChars(nome_de_usuario)) throw new Error("getUsuario:NomeDeUsuarioInvalido");
        return UsuarioModel.findOne({ nome_de_usuario });
    },

    hashSenhaUsuario(senha){
        if (!noInvalidChars(senha)) throw new Error("hashSenhaUsuario:SenhaInvalida");
        return crypto.createHash("sha256", senha + "secret");
    },

    async autenticarUsuario(nome_de_usuario, senha){
        
        if (!noInvalidChars(nome_de_usuario)) throw new Error("autenticarUsuario:NomeDeUsuarioInvalido");
        if (!noInvalidChars(senha)) throw new Error("autenticarUsuario:SenhaInvalida");

        return new Promise((resolve, reject) => {
            this.getUsuario(nome_de_usuario).then((usuario) => {

                if (!usuario) throw new Error("autenticarUsuario:NomeOuSenhaIncorretos");

                if (usuario.senha == this.hashSenhaUsuario(senha)){
                    resolve(usuario);;
                } else {
                    reject(new Error("autenticarUsuario:NomeDeUsuarioOuSenhaIncorretos"));
                }
            }).catch((err) => {
                reject("autenticarUsuario:"+err);
            });
        });
    },

    async cadastrarUsuario(dados_de_usuario){

        for (let key in dados_de_usuario){
            if (!noInvalidChars(dados_de_usuario[key])) throw new Error(`getUsuario:${key}Invalido`);
        }
        
        return new Promise((resolve, reject) => {
            this.getUsuario(dados_de_usuario.nome_de_usuario).then((usuario) => {

                if (usuario) reject(new Error("getUsuario:NomeDeUsuarioJaExiste"));
            
                UsuarioModel.create(dados_de_usuario);

                resolve({});

            }).catch((err) => {
                reject("cadastrarUsuario:"+err);
            });
        });
    }
}