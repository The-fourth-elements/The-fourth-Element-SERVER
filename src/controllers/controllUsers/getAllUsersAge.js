const { Users } = require('../../models/Users.js');

async function getAllUsersAge (req, res, next){
    try {
        const users = await Users.find({});
        if(!users) throw Error('No hay usuarios');
        const usersFilter = users.filter(user => user.age);
        const usersMap = usersfilter.map(user => user.age);
        return res.status(200).json(usersAge);
    } catch (error) {
        next({ message: error.message, statusCode: 400});
    }
};


module.exports = getAllUsersAge;