const handleUserDB = require('../../handler/dataBase/handlerUserDB');
const { Users } = require('../../models/Users');


async function deleteUser(req, res, next){
    try {
        const { id } = req.params;
        const foundUser = await handleUserDB(id);
        if (foundUser.email) {
            const deleteUser = await Users.delete({_id: id});
            if (deleteUser) return res.status(200).json({message: "User successful deleted."});
        } else throw Error('User not found');
    } catch (error) {
        next({message: error.message, statusCode: 400});
    }
}

module.exports = deleteUser;