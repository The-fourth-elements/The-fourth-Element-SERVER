const { Users } = require('../../models/Users');

async function orderUsersByAZ (req, res, next){
    try {
        if (req.query.hasOwnProperty('ASC')) {
            const users = await Users.find({}).sort({username: 1});
            if (users.length <= 0) throw Error('No hay usuarios en la Base de Datos');
            else res.status(200).json(users);
        } else if(req.query.hasOwnProperty('DSC')){
            const users = await Users.find({}).sort({username: -1});
            if (users.length <= 0) throw Error('No hay usuarios en la Base de Datos');
            else res.status(200).json(users);
        } else throw Error('Error al intentar ordenar los usuarios o no ingresó un filtro');
    } catch (error) {
        next({ message: error.message, statusCode: 400});
    }
};

module.exports = orderUsersByAZ;
