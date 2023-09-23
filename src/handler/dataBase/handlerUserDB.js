const { Users } = require('../../models/Users')

async function handleUserDB (id){
    try {
        const foundUser = await Users.findOne({"_id": id});
        if (foundUser) return foundUser;
        else throw Error('User not found.')
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = handleUserDB;