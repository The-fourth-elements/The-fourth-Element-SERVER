const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const handlerError = require('./handler/handlerError');

const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
server.use('/', routes);

server.use(handlerError);
 

module.exports = server;