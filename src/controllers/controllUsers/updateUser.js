const { Users } = require("../../models/Users");

async function updateUser(req, res, next){
    try {
        const { id } = req.body;
        if(!id) throw Error('Ingrese un id.');
        const { body } = req;
        if(!body) throw Error('Faltan datos.');
        const updateUser = await Users.findByIdAndUpdate(id, body, {new: true});
        if (updateUser) res.status(200).json(updateUser);
        else throw Error('Ocurrió un error al actualizar.');
    } catch (error) {
        next({message: error.message, statusCode: 404});
    }
};

module.exports = updateUser;