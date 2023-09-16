const mongoose = require('mongoose');
require('dotenv').config();
const { DB_URI, DB_URI_TEST, NODE_ENV } = process.env;

//conexion de la base de datos
const dbConnect = () => {

    const connectionString = NODE_ENV === 'test' ? DB_URI_TEST : DB_URI

    mongoose.connect(connectionString, { useNewUrlParser: true })
      .then(() => {
        console.log('Conexión exitosa a MongoDB');
      })
      .catch((error) => {
        console.error('Error de conexión a MongoDB:', error);
      });
  }

module.exports = dbConnect;