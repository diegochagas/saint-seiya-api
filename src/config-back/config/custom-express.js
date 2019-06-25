var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var morgan = require('morgan');
var logger = require('../servicos/logger.js');
var cors = require('cors');


module.exports = function(){
  var app = express();

  app.use(morgan("common", {
    stream: {
      write: function(mensagem){
          logger.info(mensagem);
      }
    }
  }));

  app.use(cors());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(expressValidator());

  consign()
   .include('controllers')
   .then('servicos')
   .into(app);

  return app;
}
