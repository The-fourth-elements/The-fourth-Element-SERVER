const { Users } = require('../../models/Users');

const getAllUsersDeleted = async (req, res, next) => {
    try {
        const users = await Users.findWithDeleted({ deleted: true });
        if(!users.length) throw Error('No hay usuarios eliminados.');
        return res.status(200).json(users);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = getAllUsersDeleted;