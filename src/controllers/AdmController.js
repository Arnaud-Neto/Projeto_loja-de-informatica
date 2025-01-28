const AdmModel = require('../models/AdmModel');
const crypto = require('crypto');
const {noInvalidChars} = require('../helpers/normalizarString');
const MAX_BIT_POS = 3;


module.exports = {

    async getAdm(nome_de_usuario) {
        if (!noInvalidChars(nome_de_usuario)) throw new Error("getAdm:NomeDeUsuarioInvalido");
        return AdmModel.findOne({ nome_de_usuario });
    },

    hashSenhaAdm(senha){
        if (!noInvalidChars(senha)) throw new Error("hashSenhaAdm:SenhaInvalida");
        return crypto.createHash("sha256", senha + "secret_adm");
    },

    async autenticarAdm(nome_de_usuario, senha){
        
        if (!noInvalidChars(nome_de_usuario)) throw new Error("autenticarAdm:NomeDeUsuarioInvalido");
        if (!noInvalidChars(senha)) throw new Error("autenticarAdm:SenhaInvalida");

        return new Promise((resolve, reject) => {
            this.getAdm(nome_de_usuario).then((adm) => {

                if (!adm) throw new Error("autenticarAdm:NomeOuSenhaIncorretos");

                if (adm.senha == this.hashSenhaAdm(senha)){
                    resolve(adm);;
                } else {
                    reject(new Error("autenticarAdm:NomeDeUsuarioOuSenhaIncorretos"));
                }
            })        
        });
    },

    getClerenceBit(clerence, bit_pos){
        return clerence & (0b1 << bit_pos);
    },

    async cadastrarAdm(dados_de_usuario, nome_de_usuario_responsavel, senha_responsavel){        

        for (let key in dados_de_usuario){
            if (!noInvalidChars(dados_de_usuario[key])) throw new Error(`cadastrarAdm:${key}Invalido`);
        }
        
        return new Promise((resolve, reject) => {
            this.autenticarAdm(nome_de_usuario_responsavel, senha_responsavel)
            .then((adm) => {
                if (this.getClerenceBit(adm.clerence, 1) == 0) reject("cadastrarAdm:SemPermissao"); 
            })
            .catch((err) => {
                reject('cadastrarAdm'+err);
            });

            this.getUsuario(dados_de_usuario.nome_de_usuario).then((usuario) => {

                if (usuario) reject(new Error("cadastrarAdm:NomeDeUsuarioJaExiste"));
            
                UsuarioModel.create(dados_de_usuario);

                resolve({});

            }).catch(err => {
                reject("cadastrarAdm:"+err);
            })
        });
    },

    async _setAdmAtribute(nome_de_usuario_responsavel, nome_de_usuario_alvo, campo, novo_valor){
        if (!noInvalidChars(novo_valor)) throw new Error("setAdmAtribute:NovoValorInvalido")
        if (!noInvalidChars(campo)) throw new Error("setAdmAtribute:CampoInvalido")
        if (!noInvalidChars(nome_de_usuario_alvo)) throw new Error("setAdmAtribute:NomeDeUsuarioInvalido")
        
        return new Promise((resolve, reject) => {
            console.log(`${new Date.now()} setAdmAtribute:\{responsavel:${nome_de_usuario_responsavel};alvo:${nome_de_usuario_alvo};campo:${campo};valor:${novo_valor}\}`);

            this.getAdm(nome_de_usuario_alvo).then((adm) => {
                if (!adm) reject(new Error("setAdmAtribute:AdmNaoExiste"));
                if (campo == "nome" | campo == 'email' | campo == 'clerence' | campo == "nome_de_usuario" | campo == "senha"){
                    adm[campo] = novo_valor;
                    adm.save();
                    resolve(adm);
                } else {
                    reject(new Error("setAdmAtribute:CampoInvalido"));
                }
            }).catch((err) => {
                reject('setAdmAtribute:'+err);
            })    
        });
    },

    async setClerenceBit(val, bit_pos, nome_de_usuario_alvo, nome_de_usuario, senha){
        if (val!=0b0 & val!=0b1) throw new Error("setClerenceBit:ValorInvalido");
        if (bit_pos > MAX_BIT_POS | bit_pos < 0) throw new Error("setClerenceBit:BitPosInvalida");

        return new Promise((resolve, reject) => {
            this.autenticarAdm(nome_de_usuario, senha)
            .then((adm) => {
                if ((bit_pos % 2 == 0 & (this.getClerenceBit(adm.clerence, 0) == 0b0) ) | (this.getClerenceBit(adm.clerence, bit_pos + 1) == 0b0)){
                    reject("setClerenceBit:SemPermissao");
                }
                
                let nova_clerence = (val == 0b1) ? adm.clerence | (0b1 << bit_pos) : adm.clerence & ~(0b1 << bit_pos)

                this._setAdmAtribute(nome_de_usuario_responsavel, nome_de_usuario_alvo, "clerence", nova_clerence)
                .then(resolve)
                .catch((err) => {
                    reject("setClerenceBit:"+err);
                });

            }).catch((err) => {
                reject('setClerenceBit:'+err);
            })
        })
    }
};