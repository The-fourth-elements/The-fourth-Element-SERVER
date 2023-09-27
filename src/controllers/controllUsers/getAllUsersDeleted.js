const { Users } = require('../../models/Users');

const getAllUsersDeleted = async (req, res, next) => {
    try {
        const users = await Users.findWithDeleted({ deleted: true });
        if(!users) throw Error('Ther is not users deleted');
        return res.status(200).json(users);
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
};

module.exports = getAllUsersDeleted;