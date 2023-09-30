const { Users } = require('../../models/Users');

async function getUserByEmail(req, res, next){
    const { email } = req.query;
    try {
<<<<<<< HEAD:src/controllers/getUserByEmail.js
        const { email } = req.body;
        if(!email) throw Error('Faltan datos');
        const user = await Users.findOne({email});
        if(!user) throw Error('No se encontro el email');
        return res.status(200).json(user);
=======
        if(!email) throw Error('Missing email');
        const user = await Users.findOne({email});
        if(!user) throw Error('Not matching email');
        return res.status(200).json({user: true});
>>>>>>> 355b55a7c794098600ed19469462761a0ab9b177:src/controllers/controllUsers/getUserByEmail.js
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

module.exports = getUserByEmail;