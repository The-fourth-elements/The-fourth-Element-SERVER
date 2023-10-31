const SelfKnowledge = require('../../models/SelfRegister');

async function onlyCreateSelfKnowLedge(req, res, next){
    try {
        const { selfKnowledge } = req.body;
        if(selfKnowledge.length <= 0) throw Error('Faltan datos');
        const findSelfKnowledge = await Promise.all(selfKnowledge.map(async (selfk) => {
            if(!selfk.name || !selfk.description || !selfk.questions) throw Error('Faltan datos');
            const findSelf = await SelfKnowledge.findOne({name:selfk.name})
            if(findSelf) return findSelf;
            const createSelfk = await SelfKnowledge.create({
                name: selfk.name,
                description: selfk.description,
                questions: selfk.questions
            });
            return createSelfk;
        }));
        if(!findSelfKnowledge) throw Error('Ocurrio un error');
        return res.status(200).json(findSelfKnowledge)
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = onlyCreateSelfKnowLedge;