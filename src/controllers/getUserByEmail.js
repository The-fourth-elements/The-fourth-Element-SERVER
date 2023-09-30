const { Users } = require('../models/Users');

async function getUserByMail(req, res, next){
    try {
        const { email } = req.body;
        if(!email) throw Error('Faltan datos');
        const user = await Users.findOne({email});
        if(!user) throw Error('No se encontro el email');
        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

module.exports = getUserByMail;