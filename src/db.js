const mongoose = require('mongoose');
require('dotenv').config();
const { DB_URI } = process.env;

//conexion de la base de datos
const dbConnect = () => {
    mongoose.connect(DB_URI, { useNewUrlParser: true })
      .then(() => {
        console.log('Conexión exitosa a MongoDB');
      })
      .catch((error) => {
        console.error('Error de conexión a MongoDB:', error);
      });
  }

module.exports = dbConnect;