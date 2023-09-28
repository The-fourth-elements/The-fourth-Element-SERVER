const handleUserDB = require('../../handler/dataBase/handlerUserDB');
const { Users } = require('../../models/Users');


async function deleteUser(req, res, next){
    try {
        const { id } = req.params;
        const foundUser = await handleUserDB(id);
        if (foundUser.email) {
            const deleteUser = await Users.delete({_id: id});
            if (deleteUser) return res.status(200).json({message: "Usuario eliminado exitosamente."});
        } else throw Error('Usuario no encontrado');
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = deleteUser;