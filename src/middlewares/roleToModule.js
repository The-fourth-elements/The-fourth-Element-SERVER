const Module = require("../models/Module");
const { Users } = require("../models/Users");

async function roleToModule(req, res, next){
    const { jsdklfsdjklfdsjfds, moduleId } = req.cookies
    try {
        if (!jsdklfsdjklfdsjfds || ! moduleId) throw Error('Faltan datos');
        const userRole = (await Users.findById(jsdklfsdjklfdsjfds)).role;
        const modulePaid = (await Module.findById(moduleId)).paid;
        if (userRole >= 1 || modulePaid === false) return res.status(200).json({message : 'Aprobado'});
        else if(userRole <= 0 && modulePaid === true) throw Error('No puede ingresar porque es un módulo pago.');
        else res.status(200).json({message : 'Aprobado'});
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
}

module.exports = roleToModule;