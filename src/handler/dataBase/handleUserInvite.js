const Invite = require("../../models/Invite");

async function handleUserInvite (email){
    try {
        const foundUser = await Invite.findOne({ email });
        if (foundUser) return foundUser;
        else throw Error('User not found.')
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = handleUserInvite;