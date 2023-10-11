const Quest = require("../../models/Quest");

async function getOneQuest (req, res, next){
    try {
        const { id } = req.params;
        if(!id) throw Error('Ingrese un ID');
        const quest = await Quest.findById(id);
        if(!quest) throw Error(`No se encontro la pregunta con ID: ${id}`);
        return res.status(200).json(quest);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};


module.exports = getOneQuest