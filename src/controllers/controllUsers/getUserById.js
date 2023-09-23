const handleUserDB = require("../../handler/dataBase/handlerUserDB");

async function getUserById(req, res, next) {
    try {     
        const { id } = req.query;
        if (!id) {
            next({message: 'id is invalid', statusCode: 401});
        } else {
            const user = await handleUserDB(id);
            if (user){
                res.status(200).json(user);
            } else {
                throw Error(user.error);
            }
        }
    } catch (error) {
        next(error);
    }
}

module.exports = getUserById;