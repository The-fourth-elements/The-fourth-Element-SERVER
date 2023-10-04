const { Users } = require("../../models/Users");

async function handleUserDB(id) {
    try {
        const foundUser = await Users.findById(id)
        .populate('city')
        .populate('nation')
        .populate('sport')
        .populate('progress')

        if (foundUser) return foundUser;
        else throw Error('User not found.')
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = handleUserDB;