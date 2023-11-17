const { Users } = require("../models/Users");

async function roleMiddleware(id){
    try {
        if (!id) throw Error('Ingrese el rol del usuario que realiza la consulta.');
        const findUser = await Users.findById(id);
        if(!findUser) throw Error('No se encontró el usuario');
        else return findUser.role;
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = roleMiddleware;