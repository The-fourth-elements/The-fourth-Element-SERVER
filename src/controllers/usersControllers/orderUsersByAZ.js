const { Users } = require('../../models/Users');

async function orderUsersByAZ (req, res, next){
    try {
        if (req.query.hasOwnProperty('ASC') || req.query.hasOwnProperty('DSC')) {
            const users = {};
            switch (req.query) {
                case {ASC: true}:
                    users = await Users.find({}).sort({username: 1});
                    if (users.length <= 0) throw Error;
                    else res.status(200).json(users);
                case {DSC: true}:
                    users = await Users.find({}).sort({username: -1});
                    if (users.length <= 0) throw Error;
                    else res.status(200).json(users);
                default:
                    throw Error('Error al intentar ordenar los usuarios o no hay usuarios en la Base de Datos');
            }
        } else throw Error('Ingrese un filtro')
        
    } catch (error) {
        next({ message: error.message, statusCode: 400});
    }
};

module.exports = orderUsersByAZ;
