const { Users } = require('../../models/Users');
const ResponsesSR = require('../../models/ResponsesSR');

async function addResponseSRToUser (req, res, next){
    try {
        const { userId, responseSRId } = req.params;
        if(!userId || !responseSRId) throw Error('Ingrese un ID');
        const searchUser = await Users.findById(userId);
        if(!searchUser) throw Error(`No se pudo encontrar al usuario con ID: ${userId}`);
        const searchResponse = await ResponsesSR.findById(responseSRId);
        if(!searchResponse) throw Error(`No se pudo encontrar la respuesta al auto-registro con ID: ${responseSRId}`);
        searchUser.responsesSR.push(searchResponse);
        await searchUser.save();
        return res.status(200).json({ message: 'Respuesta agregada al usuario de forma exitosa'});
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = addResponseSRToUser;