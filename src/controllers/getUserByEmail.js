const { Users } = require('../models/Users');

async function getUserByMail(req, res, next){
    try {
        const { email } = req.body;
        if(!email) throw Error('Missing email');
        const user = await Users.findOne({email});
        console.log(user);
        if(!user) throw Error('Not matching email');
        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

module.exports = getUserByMail;