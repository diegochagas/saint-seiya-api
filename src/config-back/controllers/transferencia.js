var logger = require('../servicos/logger.js');
var fs = require('fs');
var retorno = require ('../mocks/transferencia/listar-favorecido-rsp.json')

module.exports = function (app) {

    app.post('/transferencia/listar-favorecido', function (req, res, next) {
        res.status(200).send(retorno);
        next()
    });
}
