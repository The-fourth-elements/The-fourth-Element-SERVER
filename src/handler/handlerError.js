function handlerError(err, req, res, next) {
    let statusCode = 500;
    let message = 'Error en el servidor';
    if (err.statusCode) {
      statusCode = err.statusCode;
    }
    if (err.message) {
      message = err.message;
    }
    res.status(statusCode).json({ error: message });
    if (!err) next();
}
  
module.exports = handlerError;