const firebaseAdmin = require('../services/firebase')
const {Users} = require('../models/Users')

async function verifyUserRole(req, res, next){
    const token = req.cookies.Authorization
    
    try {
        const result = await firebaseAdmin.auth.verifyIdToken(token);
        const user = await Users.findOne({"firebaseID": result.uid});

        //cambiar por cualquiera que sea el valor del admin
        if(user && user.role === 1){
            next();
        }else{
            res.status(403).json({ error: 'Acceso no autorizado' });
        }

    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = verifyUserRole