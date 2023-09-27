const { Users } = require('../../models/Users');

const getUserReset = async (req, res, next) => {
    try {
        const { email } = req.body;
        if(!email) throw Error('Missing data');
        const user = await Users.findWithDeleted({ email: email });
        if(!user) throw Error('Not matching email');
        return res.status(200).json(user);
    } catch (error) {
        next({ message: error.message, statusCode: 400});
    }
};

module.exports = getUserReset;