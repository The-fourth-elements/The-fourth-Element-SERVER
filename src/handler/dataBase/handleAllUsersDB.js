const { Users } = require("../../models/Users");

async function handleAllUserDB(id) {
    try {
        const allUsers = await Users.find({})
            .select('-password')
            .populate('city')
            .populate('nation')
            .populate('sport')
            .populate('progress')
        if (Array.isArray(allUsers) && allUsers.length) {
            const consultingUser = await Users.findById(id);
            if (!consultingUser) throw Error('No se encontró el usuario que realiza la consulta, intente nuevamente.');
            else if(consultingUser.role >= 2) return allUsers;
            else throw Error('El usuario debe ser al menos rol moderador para ver todos los usuarios');
        }
        else throw Error('Users is empty');
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = handleAllUserDB;