const handleUserDB = require("../../handler/dataBase/handlerUserDB");

async function getUserById(req, res, next) {
    const { id } = req.query;
    try {
        if (!id) {
            throw Error('Id es invalido.');
        } else {
            const user = await handleUserDB(id);
            if (!user?.error){
                res.status(200).json(user);
            } else {
                throw Error(user.error);
            }
        }
    } catch (error) {
        next({ message: error.message, statusCode: 400});
    }
}

module.exports = getUserById;