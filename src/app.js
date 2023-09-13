const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const { URL } = process.env;
//const expressValidator = require('../src/middleware'); aca es como se veria una carpeta con el middleware de validacion con express-validator

const server = express();

//server.use(expressValidator()); aca llamaria a la funcion de validaciones 
server.use(express.json());
server.use(morgan('dev'));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', `${URL}`); // aca no se que ponerle xd porque no seria localhost:3000 3===D
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

//esto es para que el catch si hay un error lo agarre como tu hermana a esta
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;


// se hizo esta configuracion si esta mal vallase a la concha de su madre xd <3