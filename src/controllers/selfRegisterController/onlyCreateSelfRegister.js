const createSelfRegisterHandler = require('../../handler/modules/createSelfRegisterHandler');

async function onlyCreateSelfRegister(req, res, next){
    try {
        const { selfRegister } = req.body;
        if(selfRegister.length <= 0) throw Error('Faltan datos');
        const newSelfRegister = await Promise.all(selfRegister.map(async selfR => await createSelfRegisterHandler(selfR)));
        if(!newSelfRegister) throw Error('Ocurrio un error');
        return res.status(200).json(newSelfRegister);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = onlyCreateSelfRegister;