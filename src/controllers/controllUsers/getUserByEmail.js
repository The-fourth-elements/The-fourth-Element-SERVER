const { Users } = require('../../models/Users');

async function getUserByEmail(req, res, next){
    const { email } = req.query;
    try {
        if(!email) throw Error('Missing email');
        const user = await Users.findOne({email});
        if(!user) throw Error('Not matching email');
        return res.status(200).json({user: true});
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

module.exports = getUserByEmail;
