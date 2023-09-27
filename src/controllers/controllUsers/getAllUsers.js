const handleAllUserDB = require("../../handler/dataBase/handleAllUsersDB");

async function getAllUsers(req, res, next){
    try {     
        const user = await handleAllUserDB();
        if (!user?.error){
            res.status(200).json(user);
        } else throw Error(user.error);
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
};

module.exports = getAllUsers;