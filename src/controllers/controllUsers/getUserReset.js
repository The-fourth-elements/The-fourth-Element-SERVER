const { Users } = require('../../models/Users');

const getUserReset = async (req, res, next) => {
    try {
        const { email } = req.body;
        if(!email) throw Error('Faltan datos.');
        const user = await Users.findWithDeleted({ email: email });
        if(!user) throw Error('No se hallaron coincidencias');
        return res.status(200).json(user);
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
};

module.exports = getUserReset;