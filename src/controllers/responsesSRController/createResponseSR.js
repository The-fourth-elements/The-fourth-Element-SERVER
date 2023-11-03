const { Users } = require('../../models/Users');
const SelfRegister = require('../../models/SelfRegister');
const findOrCreateResponseRS = require('../../handler/responsesSR/findOrCreateResponseRS');

async function createResponseSR (req, res, next){
    try {
        const { selfRegisterId, userId } = req.params;
        const { response, comments } = req.body;
        if(!selfRegisterId || !userId) throw Error('Ingrese un ID');
        if(!response) throw Error('Ingese una respuesta');
        const searchUser = await Users.findById(userId);
        if(!searchUser) throw Error(`No se pudo encontrar al usuario con ID: ${userId}`);
        const searchSelfRe = await SelfRegister.findById(selfRegisterId);
        if(!searchSelfRe) throw Error(`No se pudo encontrar al auto-registro con ID: ${selfRegisterId}`);
        const newResponse = await findOrCreateResponseRS(response, comments, searchSelfRe);
        if(!newResponse) throw Error('Error al encontrar o crear la respuesta');
        searchUser.responsesSR.push(newResponse);
        await searchUser.save();
        return res.status(200).json({ message: 'Respuesta del auto-registro agregada al usuario de forma correcta'});
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = createResponseSR;