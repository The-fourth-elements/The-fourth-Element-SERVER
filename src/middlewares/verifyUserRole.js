const { Users } = require('../models/Users');
const { decriptToken } = require('../services/token');

async function verifyUserRole(req, res, next){
    
    const token = req.cookies.jwt;
    console.log(token);

    try {
        if (token) {
            //verify the user role
            const verifyToken = decriptToken(token);

        }

        //cambiar por cualquiera que sea el valor del admin
        if(user && user.role >= 2){
            next();
        }else{
            res.status(403).json({ error: 'Acceso no autorizado' });
        }

    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = verifyUserRole