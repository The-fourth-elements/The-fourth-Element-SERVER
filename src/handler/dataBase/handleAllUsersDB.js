const { Users } = require("../../models/Users");

async function handleAllUserDB() {
    try {
        const allUsers = await Users.find({})
            .populate('city')
            .populate('nation')
            .populate('sport')
        if (Array.isArray(allUsers) && allUsers.length) {
            return allUsers;
        }
        throw Error('Users is empty');
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = handleAllUserDB;