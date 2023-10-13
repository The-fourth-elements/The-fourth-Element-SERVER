const { Users } = require('../../models/Users');

async function getUserByEmail(req, res, next){
    try {
        const { email } = req.query;
        if(!email) throw Error('Faltan datos');
        const user = await Users.findOne({email});
        if(!user) throw Error('No se encontro el email');
        return res.status(200).json(user);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = getUserByEmail;
