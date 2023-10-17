const { Users } = require('../../models/Users');

async function orderUsersByAZ (req, res, next){
    try {
        const { ASC, DSC } = req.query;
        if(!ASC) throw Error('Ingrese un filtro');
        if(!DSC) throw Error('Ingrese un filtro');
        let users;
        if(ASC){
            users = await Users.find({}).sort({username: 1});
        }
        if(DSC){
            users = await Users.find({}).sort({username: -1});
        }
        return res.status(200).json(users);
    } catch (error) {
        next({ message: error.message, statusCode: 400});
    }
};

module.exports = orderUsersByAZ;
